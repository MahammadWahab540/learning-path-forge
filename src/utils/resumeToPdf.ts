
/**
 * Generate a PDF from the user's profile, skills, and projects
 * This is a mock implementation - in a real app, you would use
 * @react-pdf/renderer or jsPDF to generate an actual PDF
 */

interface GeneratePdfProps {
  user: {
    firstName?: string;
    lastName?: string;
    email?: string;
  } | null;
  skills: Array<{
    id: string;
    name: string;
    level: string;
  }>;
  projects: Array<{
    id: string;
    title: string;
    description: string;
  }>;
}

export async function generatePdf({ user, skills, projects }: GeneratePdfProps): Promise<Blob> {
  // In a real implementation, you would use @react-pdf/renderer or jsPDF
  // to generate an actual PDF. For this mock, we'll just create a Blob
  // with some HTML content
  
  // Mock delay to simulate PDF generation
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const content = `
    <html>
      <head>
        <title>${user?.firstName} ${user?.lastName} - Resume</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 30px; }
          h1 { color: #8B5CF6; }
          h2 { color: #0EA5E9; border-bottom: 1px solid #eee; margin-top: 20px; }
          .contact { color: #666; }
        </style>
      </head>
      <body>
        <h1>${user?.firstName} ${user?.lastName}</h1>
        <p class="contact">${user?.email}</p>
        
        <h2>Skills</h2>
        <ul>
          ${skills.map(skill => `<li>${skill.name} (${skill.level})</li>`).join('')}
        </ul>
        
        <h2>Projects</h2>
        <ul>
          ${projects.map(project => `
            <li>
              <strong>${project.title}</strong>
              <p>${project.description}</p>
            </li>
          `).join('')}
        </ul>
      </body>
    </html>
  `;
  
  // Create a Blob with HTML content
  return new Blob([content], { type: 'application/pdf' });
}
