import { useState, useEffect } from 'react';
import { firestore } from '../../lib/firebase';
import { collection, query, onSnapshot, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { Trash2, Plus, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import ImageUpload from '../ImageUpload';

interface AIProject {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: any;
}

const AdminAIAutomation = () => {
  const [projects, setProjects] = useState<AIProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
  });

  useEffect(() => {
    const q = query(collection(firestore, 'aiAutomation'));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data: AIProject[] = [];
        snapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() } as AIProject);
        });
        setProjects(data.sort((a, b) => b.createdAt - a.createdAt));
        setLoading(false);
      },
      (error) => {
        console.error('Error:', error);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.imageUrl) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    try {
      await addDoc(collection(firestore, 'aiAutomation'), {
        ...formData,
        createdAt: new Date(),
      });
      toast.success('Project added successfully');
      setFormData({
        title: '',
        description: '',
        imageUrl: '',
      });
      setShowForm(false);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to add project');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteDoc(doc(firestore, 'aiAutomation', id));
        toast.success('Project deleted');
      } catch (error) {
        console.error('Error:', error);
        toast.error('Failed to delete project');
      }
    }
  };

  if (loading) {
    return <div className="text-white/60">Loading...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Add Project Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">AI Automation Projects</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg hover:bg-white/90 transition-all font-medium"
        >
          <Plus size={18} />
          Add Project
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="p-6 rounded-lg bg-white/5 border border-white/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Project title"
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-white/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Project description"
                rows={3}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-white/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Image *
              </label>
              <ImageUpload
                onUploadComplete={(url) =>
                  setFormData({ ...formData, imageUrl: url })
                }
                folder="aiAutomation"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 py-2 bg-white text-black rounded-lg hover:bg-white/90 disabled:opacity-50 transition-all font-medium flex items-center justify-center gap-2"
              >
                {submitting && <Loader2 size={18} className="animate-spin" />}
                {submitting ? 'Adding...' : 'Add Project'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 py-2 border border-white/20 rounded-lg hover:border-white/50 transition-colors text-white"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Projects List */}
      <div className="space-y-4">
        {projects.length === 0 ? (
          <p className="text-white/60">No projects yet</p>
        ) : (
          projects.map((project) => (
            <div
              key={project.id}
              className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-white/30 transition-all flex items-start gap-4"
            >
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-white truncate">{project.title}</h3>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="p-2 hover:bg-red-500/20 rounded-lg transition-colors flex-shrink-0"
                  >
                    <Trash2 size={18} className="text-red-500" />
                  </button>
                </div>
                <p className="text-sm text-white/60">{project.description}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminAIAutomation;
