import { useEffect, useState } from 'react';

type SavedCompany = {
  id: number;
  company: string;
  role: string;
  location: string;
  package: string;
  deadline: string;
  eligibility: string;
  status: string;
};

const SavedCompanies = () => {
  const [saved, setSaved] = useState<SavedCompany[]>([]);

  useEffect(() => {
  const items: SavedCompany[] = [];
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('saved_')) {
        const value = localStorage.getItem(key);
        if (value) {
          try {
            items.push(JSON.parse(value));
          } catch {
            // Could log error if needed
          }
        }
      }
    });
    setSaved(items);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">Saved Companies</h1>
        {saved.length === 0 ? (
          <p className="text-gray-600">No companies saved yet.</p>
        ) : (
          <div className="grid gap-6">
            {saved.map((company, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-semibold">{company.company}</h2>
                <p className="text-gray-600">{company.role}</p>
                <p className="text-gray-600">{company.location}</p>
                <p className="text-gray-600">{company.package}</p>
                <p className="text-gray-600">{company.eligibility}</p>
                <button
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                  onClick={() => {
                    localStorage.removeItem(`saved_${company.company}_${company.role}`);
                    setSaved(saved.filter((_, i) => i !== idx));
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedCompanies;