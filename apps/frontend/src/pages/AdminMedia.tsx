import { Upload, Trash2, Download } from 'lucide-react'
import AdminLayout from '../components/admin/AdminLayout'
import { useState } from 'react'

export default function AdminMedia() {
  const [media, setMedia] = useState([])

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Media Library</h1>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            <Upload size={20} />
            Upload Media
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          {media.length === 0 ? (
            <div className="text-center py-12">
              <Upload size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">No media uploaded yet</p>
              <p className="text-gray-500 text-sm">Click "Upload Media" to add images and files</p>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-4">
              {/* Media items will be displayed here */}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
