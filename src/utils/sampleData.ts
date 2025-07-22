// Sample data for testing the blog functionality

export const samplePosts = [
  {
    id: 1,
    title: "Welcome to Our New Internal Portal",
    content: "We're excited to announce the launch of our new internal communication portal. This platform will serve as your central hub for company updates, announcements, and important information.",
    category: "Announcements",
    status: "published",
    author: "Admin Team",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    featuredImage: ""
  },
  {
    id: 2,
    title: "New Employee Benefits Package",
    content: "We're pleased to announce enhancements to our employee benefits package, including improved health insurance coverage and additional wellness programs.",
    category: "HR Updates",
    status: "published",
    author: "HR Department",
    createdAt: "2024-01-14T14:30:00Z",
    updatedAt: "2024-01-14T14:30:00Z",
    featuredImage: ""
  },
  {
    id: 3,
    title: "Q4 Financial Results",
    content: "Our company has achieved record-breaking results in Q4. Revenue increased by 25% compared to the previous quarter, demonstrating strong market performance.",
    category: "Business News",
    status: "published",
    author: "Finance Team",
    createdAt: "2024-01-13T09:15:00Z",
    updatedAt: "2024-01-13T09:15:00Z",
    featuredImage: ""
  },
  {
    id: 4,
    title: "Remote Work Policy Update",
    content: "Following employee feedback, we're updating our remote work policy to provide more flexibility while maintaining productivity standards.",
    category: "HR Updates",
    status: "published",
    author: "HR Department",
    createdAt: "2024-01-12T11:45:00Z",
    updatedAt: "2024-01-12T11:45:00Z",
    featuredImage: ""
  },
  {
    id: 5,
    title: "New Government Regulations Impact",
    content: "Recent changes in government regulations will affect our compliance procedures. All department heads should review the updated guidelines.",
    category: "Political News",
    status: "published",
    author: "Legal Department",
    createdAt: "2024-01-11T16:20:00Z",
    updatedAt: "2024-01-11T16:20:00Z",
    featuredImage: ""
  },
  {
    id: 6,
    title: "Office Renovation Schedule",
    content: "The office renovation project will begin next month. Please see the attached schedule for affected areas and temporary arrangements.",
    category: "Announcements",
    status: "published",
    author: "Facilities Team",
    createdAt: "2024-01-10T13:00:00Z",
    updatedAt: "2024-01-10T13:00:00Z",
    featuredImage: ""
  },
  {
    id: 7,
    title: "Draft: Upcoming Training Programs",
    content: "We're planning several training programs for the upcoming quarter. This post is still in draft mode.",
    category: "HR Updates",
    status: "draft",
    author: "Training Team",
    createdAt: "2024-01-09T10:30:00Z",
    updatedAt: "2024-01-09T10:30:00Z",
    featuredImage: ""
  }
];

export const sampleDocuments = [
  {
    id: 1,
    title: "New Employee Onboarding Checklist",
    content: "<h2>Welcome to the Team!</h2><p>This comprehensive checklist will guide you through your first week at our company. Please complete each item and check with your manager if you have any questions.</p><ul><li>Complete HR paperwork</li><li>Set up your workstation</li><li>Meet your team members</li><li>Review company policies</li><li>Complete mandatory training modules</li></ul>",
    docType: "Onboarding",
    status: "published",
    author: "Sarah Johnson",
    departmentTags: ["Human Resources", "Information Technology"],
    createdAt: "2024-01-15T09:00:00Z",
    updatedAt: "2024-01-15T09:00:00Z"
  },
  {
    id: 2,
    title: "Remote Work Policy 2024",
    content: "<h2>Remote Work Guidelines</h2><p>This policy outlines the company's approach to remote work arrangements, eligibility criteria, and expectations for remote employees.</p><h3>Eligibility</h3><p>All full-time employees with at least 6 months of tenure are eligible for remote work arrangements.</p><h3>Requirements</h3><ul><li>Maintain regular communication with team</li><li>Ensure reliable internet connection</li><li>Participate in all scheduled meetings</li><li>Meet all performance objectives</li></ul>",
    docType: "Company Policy",
    status: "published",
    author: "Michael Brown",
    departmentTags: ["Human Resources", "Operations"],
    createdAt: "2024-01-14T11:30:00Z",
    updatedAt: "2024-01-14T11:30:00Z"
  },
  {
    id: 3,
    title: "Expense Report Submission Process",
    content: "<h2>How to Submit Expense Reports</h2><p>Follow these step-by-step instructions to submit your expense reports for reimbursement.</p><h3>Step 1: Gather Documentation</h3><p>Collect all receipts and supporting documents for your expenses.</p><h3>Step 2: Access the System</h3><p>Log into the expense management portal using your employee credentials.</p><h3>Step 3: Create New Report</h3><p>Click 'New Report' and fill in all required fields.</p><h3>Step 4: Submit for Approval</h3><p>Review your report and submit to your manager for approval.</p>",
    docType: "Procedure",
    status: "published",
    author: "Emily Davis",
    departmentTags: ["Finance", "Human Resources"],
    createdAt: "2024-01-13T14:15:00Z",
    updatedAt: "2024-01-13T14:15:00Z"
  },
  {
    id: 4,
    title: "Best Practices for Client Communication",
    content: "<h2>Client Communication Guidelines</h2><p>These guidelines will help you maintain professional and effective communication with our clients.</p><h3>Email Communication</h3><ul><li>Respond within 24 hours</li><li>Use clear, professional language</li><li>Include relevant team members in CC</li><li>Proofread before sending</li></ul><h3>Phone Calls</h3><ul><li>Prepare an agenda beforehand</li><li>Take detailed notes</li><li>Follow up with email summary</li><li>Be punctual and professional</li></ul>",
    docType: "Guideline",
    status: "published",
    author: "David Wilson",
    departmentTags: ["Sales", "Marketing"],
    createdAt: "2024-01-12T16:45:00Z",
    updatedAt: "2024-01-12T16:45:00Z"
  },
  {
    id: 5,
    title: "Product Feature Documentation - CRM Module",
    content: "<h2>CRM Module Overview</h2><p>Our Customer Relationship Management module helps you track and manage customer interactions effectively.</p><h3>Key Features</h3><ul><li>Contact Management</li><li>Lead Tracking</li><li>Sales Pipeline</li><li>Reporting Dashboard</li><li>Email Integration</li></ul><h3>Getting Started</h3><p>To access the CRM module, navigate to the main dashboard and click on 'CRM' in the sidebar menu.</p><h3>User Permissions</h3><p>Different user roles have varying levels of access to CRM features. Contact your administrator for role-specific permissions.</p>",
    docType: "Company Products",
    status: "published",
    author: "Jessica Miller",
    departmentTags: ["Product", "Sales", "Information Technology"],
    createdAt: "2024-01-11T10:20:00Z",
    updatedAt: "2024-01-11T10:20:00Z"
  },
  {
    id: 6,
    title: "Security Incident Response Plan",
    content: "<h2>Security Incident Response</h2><p>This document outlines the procedures to follow in case of a security incident or data breach.</p><h3>Immediate Actions</h3><ol><li>Identify and contain the incident</li><li>Notify the IT security team immediately</li><li>Document all relevant details</li><li>Do not attempt to fix the issue yourself</li></ol><h3>Reporting</h3><p>All security incidents must be reported within 1 hour of discovery to the security team at security@company.com</p>",
    docType: "Procedure",
    status: "published",
    author: "Robert Taylor",
    departmentTags: ["Information Technology", "Legal"],
    createdAt: "2024-01-10T13:30:00Z",
    updatedAt: "2024-01-10T13:30:00Z"
  },
  {
    id: 7,
    title: "Code of Conduct and Ethics",
    content: "<h2>Company Code of Conduct</h2><p>Our code of conduct establishes the ethical standards and behavioral expectations for all employees.</p><h3>Core Values</h3><ul><li>Integrity in all business dealings</li><li>Respect for colleagues and clients</li><li>Commitment to excellence</li><li>Transparency and honesty</li></ul><h3>Prohibited Conduct</h3><p>The following behaviors are strictly prohibited and may result in disciplinary action:</p><ul><li>Harassment or discrimination</li><li>Conflicts of interest</li><li>Misuse of company resources</li><li>Violation of confidentiality</li></ul>",
    docType: "Company Policy",
    status: "published",
    author: "Amanda Anderson",
    departmentTags: ["Human Resources", "Legal"],
    createdAt: "2024-01-09T15:00:00Z",
    updatedAt: "2024-01-09T15:00:00Z"
  },
  {
    id: 8,
    title: "IT Equipment Setup Guide",
    content: "<h2>Setting Up Your Work Equipment</h2><p>This guide will help new employees set up their IT equipment and access company systems.</p><h3>Laptop Setup</h3><ol><li>Unbox your laptop and accessories</li><li>Connect to power and turn on</li><li>Follow the initial setup wizard</li><li>Connect to company WiFi network</li></ol><h3>Software Installation</h3><p>The following software will be automatically installed:</p><ul><li>Microsoft Office Suite</li><li>Company VPN client</li><li>Antivirus software</li><li>Communication tools</li></ul>",
    docType: "Onboarding",
    status: "published",
    author: "Christopher Lee",
    departmentTags: ["Information Technology", "Human Resources"],
    createdAt: "2024-01-08T11:15:00Z",
    updatedAt: "2024-01-08T11:15:00Z"
  }
];

export const initializeSampleData = () => {
  // Check if posts already exist
  const existingPosts = localStorage.getItem('posts');
  if (!existingPosts || JSON.parse(existingPosts).length === 0) {
    localStorage.setItem('posts', JSON.stringify(samplePosts));
    console.log('Sample posts initialized');
  }
  
  // Check if documents already exist
  const existingDocuments = localStorage.getItem('documents');
  if (!existingDocuments || JSON.parse(existingDocuments).length === 0) {
    localStorage.setItem('documents', JSON.stringify(sampleDocuments));
    console.log('Sample documents initialized');
  }
};
