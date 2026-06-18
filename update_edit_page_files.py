import os

path = 'app/edit/[category]/[id]/page.tsx'

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add removedFiles state
content = content.replace(
    "const [selectedFiles, setSelectedFiles] = useState<Record<string, string>>({});",
    "const [selectedFiles, setSelectedFiles] = useState<Record<string, string>>({});\n  const [removedFiles, setRemovedFiles] = useState<Record<string, string[]>>({});"
)

# Add helpers
helpers = """  const getExistingFiles = (name: string) => {
    if (!initialData) return [];
    
    // Some backend fields don't match frontend exact names perfectly for files in some edge cases
    // but we mapped them well in the update script.
    // Let's use the field.name or mapped names
    let backendName = name;
    if (name === 'logo') backendName = 'logoUrl';
    if (name === 'groupPhoto') backendName = 'groupPhotoUrl';
    if (name === 'mediaUploads') backendName = 'mediaLinks'; // sportForm uses mediaLinks
    if (name === 'houseFlag') backendName = 'houseFlagUrl';
    if (name === 'guildLogo') backendName = 'badgeLogoUrl';
    
    let val = initialData[backendName] || initialData[name];
    if (!val) return [];
    if (!Array.isArray(val)) val = [val];
    
    const removed = removedFiles[name] || [];
    return val.filter((url: string) => !removed.includes(url));
  };

  const handleRemoveFile = (fieldName: string, url: string) => {
    setRemovedFiles(prev => ({
      ...prev,
      [fieldName]: [...(prev[fieldName] || []), url]
    }));
  };
"""

content = content.replace("const getDefVal = (name: string) => {", helpers + "\n  const getDefVal = (name: string) => {")

# Update file input section
file_ui = """{field.type === 'file' && (
                <div className="form-file-wrapper">
                  {getExistingFiles(field.name).length > 0 && (
                    <div style={{ marginBottom: '1rem', background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '8px', width: '100%' }}>
                      <span style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Currently Uploaded:</span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {getExistingFiles(field.name).map((url: string, idx: number) => (
                          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.3)', padding: '0.5rem 1rem', borderRadius: '6px' }}>
                            <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--sbc-green)', fontSize: '0.85rem', textDecoration: 'none', maxWidth: '70%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {url.split('/').pop()}
                            </a>
                            <button type="button" onClick={() => handleRemoveFile(field.name, url)} style={{ background: 'transparent', color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '4px', padding: '0.25rem 0.5rem', fontSize: '0.75rem', cursor: 'pointer', transition: 'all 0.2s' }} onMouseOver={e => e.currentTarget.style.background='rgba(239,68,68,0.1)'} onMouseOut={e => e.currentTarget.style.background='transparent'}>Remove</button>
                            <input type="hidden" name={`existing_${field.name}`} value={url} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="file-icon">⇪</div>
                  <span style={{ fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                    {selectedFiles[field.name] ? 'New files selected:' : 'Upload new file / drag & drop'}
                  </span>
                  <span style={{ fontSize: '0.85rem', color: selectedFiles[field.name] ? 'var(--sbc-green)' : 'var(--text-secondary)' }}>
                    {selectedFiles[field.name] || `Accepts ${field.accept || 'images'}`}
                  </span>
                  <input 
                    type="file"
                    name={field.name}
                    accept={field.accept}
                    required={field.required && getExistingFiles(field.name).length === 0}
                    multiple={field.name === 'mediaUploads' || field.name === 'officialPhotos' || field.name === 'actionPhotos' || field.name === 'achievementPhotos'}
                    onChange={(e) => handleFileChange(field.name, e)}
                    className="form-file-input"
                  />
                </div>
              )}"""

import re
content = re.sub(r'\{field\.type === \'file\' && \([\s\S]*?className="form-file-input"\s*/>\s*</div>\s*\)\}', file_ui, content)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated app/edit/[category]/[id]/page.tsx")
