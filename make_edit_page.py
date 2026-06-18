import os

form_page_path = 'app/forms/[category]/page.tsx'
edit_page_path = 'app/edit/[category]/[id]/page.tsx'

with open(form_page_path, 'r') as f:
    content = f.read()

# Change component signature
content = content.replace(
    "export default function FormPage({ params }: { params: { category: string } }) {",
    "export default function EditPage({ params }: { params: { category: string, id: string } }) {\n  const [initialData, setInitialData] = useState<any>(null);\n  const [isLoadingData, setIsLoadingData] = useState(true);"
)

# Fetch initial data
fetch_logic = """
  useEffect(() => {
    if (!isAuthenticated) return;
    fetch(`/api/submissions/${params.category}/${params.id}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch data');
        return res.json();
      })
      .then(data => {
        setInitialData(data.submission);
        setIsLoadingData(false);
      })
      .catch(() => {
        router.push('/my-submissions');
      });
  }, [isAuthenticated, params.category, params.id, router]);
"""

content = content.replace("const config = FORMS_CONFIG[params.category];", fetch_logic + "\n  const config = FORMS_CONFIG[params.category];")

# Add loading check
content = content.replace(
    "if (isAuthenticated === null) {",
    "if (isAuthenticated === null || isLoadingData) {"
)

# Change API route to edit
content = content.replace(
    "`/api/submit?category=${params.category}`",
    "`/api/edit?category=${params.category}&id=${params.id}`"
)

# Replace "Submission Successful" with "Update Successful"
content = content.replace("Submission Successful", "Update Successful")
content = content.replace("Your records have been securely uploaded", "Your records have been successfully updated")
content = content.replace("Uploading Records...", "Updating Records...")
content = content.replace("Submit Records", "Save Changes")

# Add defaultValues to inputs
# We need a helper to format array data to string for text inputs if needed
content = content.replace(
    "<form ref={formRef}",
    "const getDefVal = (name: string) => {\n    if (!initialData) return '';\n    const val = initialData[name];\n    if (Array.isArray(val)) return val.join(', ');\n    return val || '';\n  };\n\n  <form ref={formRef}"
)

# Add defaultValue to inputs
content = content.replace(
    'placeholder={`Enter details...`}',
    'placeholder={`Enter details...`}\n                  defaultValue={getDefVal(field.name)}'
)
content = content.replace(
    'defaultValue=""',
    'defaultValue={getDefVal(field.name)}'
)
content = content.replace(
    'placeholder={`Type response here...`}',
    'placeholder={`Type response here...`}\n                  defaultValue={getDefVal(field.name)}'
)

# Handle file inputs - make them not required if initial data exists
# For files, the DB fields might not match field.name directly in all cases, but usually they do or they are handled manually.
# Let's just make required={false} for all files in edit mode.
content = content.replace(
    'required={field.required}',
    'required={field.type === \'file\' ? false : field.required}'
)

os.makedirs(os.path.dirname(edit_page_path), exist_ok=True)
with open(edit_page_path, 'w') as f:
    f.write(content)

print("Created app/edit/[category]/[id]/page.tsx")
