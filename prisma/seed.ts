import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing data (optional - comment out if you want to keep existing data)
  console.log('🧹 Cleaning existing data...');
  await prisma.issue.deleteMany();
  await prisma.user.deleteMany();

  // Hash password function
  const hashPassword = async (password: string): Promise<string> => {
    return bcrypt.hash(password, 10);
  };

  // Create Users
  console.log('👥 Creating users...');
  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: 'John Anderson',
        email: 'john.anderson@apnisec.com',
        password: await hashPassword('SecurePass123!'),
      },
    }),
    prisma.user.create({
      data: {
        name: 'Priya Sharma',
        email: 'priya.sharma@apnisec.com',
        password: await hashPassword('SecurePass123!'),
      },
    }),
    prisma.user.create({
      data: {
        name: 'Michael Chen',
        email: 'michael.chen@apnisec.com',
        password: await hashPassword('SecurePass123!'),
      },
    }),
    prisma.user.create({
      data: {
        name: 'Sarah Williams',
        email: 'sarah.williams@apnisec.com',
        password: await hashPassword('SecurePass123!'),
      },
    }),
    prisma.user.create({
      data: {
        name: 'David Rodriguez',
        email: 'david.rodriguez@apnisec.com',
        password: await hashPassword('SecurePass123!'),
      },
    }),
    prisma.user.create({
      data: {
        name: 'Emily Johnson',
        email: 'emily.johnson@apnisec.com',
        password: await hashPassword('SecurePass123!'),
      },
    }),
    prisma.user.create({
      data: {
        name: 'Rajesh Kumar',
        email: 'rajesh.kumar@apnisec.com',
        password: await hashPassword('SecurePass123!'),
      },
    }),
  ]);

  console.log(`✅ Created ${users.length} users`);

  // Issue templates with realistic cybersecurity content
  const issueTemplates = [
    // Cloud Security Issues
    {
      type: 'Cloud Security',
      title: 'AWS IAM Privilege Escalation Risk Detected',
      description: 'Multiple IAM roles have been identified with excessive permissions that could lead to privilege escalation. The roles have been granted admin-level access when read-only permissions would suffice. Immediate review and remediation required to prevent potential security breaches.',
      priority: 'critical',
      status: 'open',
    },
    {
      type: 'Cloud Security',
      title: 'Azure Storage Account Public Access Enabled',
      description: 'A critical Azure Storage Account has been configured with public blob access enabled. This exposes sensitive customer data to unauthorized access. The storage account contains PII and financial records that must be protected under GDPR and SOC 2 compliance requirements.',
      priority: 'critical',
      status: 'in-progress',
    },
    {
      type: 'Cloud Security',
      title: 'GCP Service Account Key Rotation Overdue',
      description: 'Service account keys in Google Cloud Platform have not been rotated in over 180 days, violating our security policy. These keys are used for production workloads and require immediate rotation to maintain security posture.',
      priority: 'high',
      status: 'open',
    },
    {
      type: 'Cloud Security',
      title: 'S3 Bucket Encryption Not Configured',
      description: 'Multiple S3 buckets storing sensitive application logs and backup data are missing server-side encryption. This violates our data protection standards and could result in data exposure if buckets are compromised.',
      priority: 'high',
      status: 'open',
    },
    {
      type: 'Cloud Security',
      title: 'CloudTrail Logging Disabled in Production',
      description: 'AWS CloudTrail logging has been disabled in the production environment, preventing security monitoring and audit trail generation. This is a critical compliance violation that must be addressed immediately.',
      priority: 'critical',
      status: 'resolved',
    },
    {
      type: 'Cloud Security',
      title: 'Multi-Factor Authentication Not Enforced',
      description: 'Root account and administrative users in AWS do not have MFA enabled. This creates a significant security risk as compromised credentials could lead to complete account takeover.',
      priority: 'high',
      status: 'in-progress',
    },
    {
      type: 'Cloud Security',
      title: 'Network Security Group Rules Too Permissive',
      description: 'Azure Network Security Groups contain rules allowing traffic from 0.0.0.0/0 on critical ports (22, 3389). These overly permissive rules expose infrastructure to potential brute force attacks and unauthorized access attempts.',
      priority: 'high',
      status: 'open',
    },
    {
      type: 'Cloud Security',
      title: 'CloudWatch Log Retention Policy Insufficient',
      description: 'CloudWatch log groups are configured with only 7 days retention, which is insufficient for security incident investigation and compliance requirements. Should be increased to at least 90 days.',
      priority: 'medium',
      status: 'open',
    },
    // VAPT Issues
    {
      type: 'VAPT',
      title: 'SQL Injection Vulnerability in User Authentication',
      description: 'Penetration testing revealed a SQL injection vulnerability in the user login endpoint. The application does not properly sanitize user input, allowing attackers to execute arbitrary SQL queries and potentially access sensitive database records.',
      priority: 'critical',
      status: 'open',
    },
    {
      type: 'VAPT',
      title: 'Cross-Site Scripting (XSS) in Comment System',
      description: 'Stored XSS vulnerability detected in the user comment system. Malicious scripts can be injected and executed when other users view comments, potentially leading to session hijacking and data theft.',
      priority: 'high',
      status: 'in-progress',
    },
    {
      type: 'VAPT',
      title: 'Insecure Direct Object Reference (IDOR)',
      description: 'The API endpoint for user profile access does not properly validate authorization. Users can access other users\' profiles by manipulating the user ID parameter in the request URL.',
      priority: 'high',
      status: 'open',
    },
    {
      type: 'VAPT',
      title: 'Weak Password Policy Enforcement',
      description: 'The application accepts weak passwords that do not meet security standards. Password complexity requirements are not enforced, allowing users to set passwords like "password123" which are easily compromised.',
      priority: 'medium',
      status: 'resolved',
    },
    {
      type: 'VAPT',
      title: 'Session Management Vulnerabilities',
      description: 'Application sessions do not expire properly and lack secure session token generation. Session tokens are predictable and can be brute-forced, allowing attackers to hijack user sessions.',
      priority: 'high',
      status: 'open',
    },
    {
      type: 'VAPT',
      title: 'Missing Security Headers',
      description: 'Critical security headers (X-Frame-Options, X-Content-Type-Options, Content-Security-Policy) are missing from HTTP responses. This exposes the application to clickjacking, MIME type sniffing, and XSS attacks.',
      priority: 'medium',
      status: 'in-progress',
    },
    {
      type: 'VAPT',
      title: 'API Rate Limiting Not Implemented',
      description: 'REST API endpoints lack rate limiting, making them vulnerable to brute force attacks and denial of service. Attackers can make unlimited requests to authentication endpoints.',
      priority: 'medium',
      status: 'open',
    },
    {
      type: 'VAPT',
      title: 'Sensitive Data Exposure in API Responses',
      description: 'API endpoints return sensitive information including internal IDs, database timestamps, and error messages that reveal system architecture. This information disclosure aids attackers in reconnaissance.',
      priority: 'low',
      status: 'open',
    },
    // Reteam Assessment Issues
    {
      type: 'Reteam Assessment',
      title: 'Insufficient Security Training for Development Team',
      description: 'Recent security assessment revealed that 40% of the development team lacks proper security awareness training. Team members are not familiar with secure coding practices, leading to introduction of vulnerabilities.',
      priority: 'high',
      status: 'open',
    },
    {
      type: 'Reteam Assessment',
      title: 'Missing Code Review Security Checklist',
      description: 'Code review process does not include security-focused checklist. Security vulnerabilities are being merged into production without proper review, increasing the risk of security incidents.',
      priority: 'medium',
      status: 'in-progress',
    },
    {
      type: 'Reteam Assessment',
      title: 'Inadequate Incident Response Procedures',
      description: 'The team lacks documented incident response procedures for security breaches. There is no clear escalation path or communication plan in case of a security incident, which could delay response time.',
      priority: 'high',
      status: 'open',
    },
    {
      type: 'Reteam Assessment',
      title: 'Dependency Vulnerability Management Gap',
      description: 'No automated process exists for tracking and updating vulnerable dependencies. Multiple outdated packages with known CVEs are present in the codebase, creating security risks.',
      priority: 'medium',
      status: 'open',
    },
    {
      type: 'Reteam Assessment',
      title: 'Security Documentation Outdated',
      description: 'Security documentation and runbooks have not been updated in over 12 months. Current procedures do not reflect recent infrastructure changes, making incident response difficult.',
      priority: 'low',
      status: 'resolved',
    },
    {
      type: 'Reteam Assessment',
      title: 'Access Control Review Overdue',
      description: 'Quarterly access control review has not been conducted for 6 months. Multiple former employees and contractors still have active access to production systems and sensitive repositories.',
      priority: 'high',
      status: 'open',
    },
    {
      type: 'Reteam Assessment',
      title: 'Security Testing Not Integrated in CI/CD',
      description: 'CI/CD pipeline lacks automated security testing. Static application security testing (SAST) and dependency scanning are not performed automatically, allowing vulnerabilities to reach production.',
      priority: 'medium',
      status: 'in-progress',
    },
  ];

  // Distribute issues across users randomly
  console.log('🔒 Creating security issues...');
  const issues = [];
  const statuses: Array<'open' | 'in-progress' | 'resolved' | 'closed'> = ['open', 'in-progress', 'resolved', 'closed'];
  const priorities: Array<'low' | 'medium' | 'high' | 'critical'> = ['low', 'medium', 'high', 'critical'];

  for (let i = 0; i < issueTemplates.length; i++) {
    const template = issueTemplates[i];
    const randomUser = users[Math.floor(Math.random() * users.length)];
    
    // Create the issue with the template data
    const issue = await prisma.issue.create({
      data: {
        userId: randomUser.id,
        type: template.type,
        title: template.title,
        description: template.description,
        priority: template.priority,
        status: template.status,
      },
    });
    issues.push(issue);
  }

  // Add a few more issues with varied statuses and priorities for better distribution
  const additionalIssues = [
    {
      type: 'Cloud Security',
      title: 'Kubernetes Secrets Stored in Plain Text',
      description: 'Kubernetes secrets are being stored as plain text in configuration files committed to version control. This exposes sensitive credentials including database passwords and API keys.',
      priority: 'critical',
      status: 'open',
    },
    {
      type: 'VAPT',
      title: 'CSRF Protection Missing on State-Changing Operations',
      description: 'Forms that perform state-changing operations (password reset, email change) lack CSRF tokens, making them vulnerable to cross-site request forgery attacks.',
      priority: 'high',
      status: 'open',
    },
    {
      type: 'Reteam Assessment',
      title: 'Security Metrics Dashboard Not Configured',
      description: 'Security metrics dashboard is not properly configured to track key security indicators. Team lacks visibility into security posture and incident trends.',
      priority: 'low',
      status: 'resolved',
    },
  ];

  for (const template of additionalIssues) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const issue = await prisma.issue.create({
      data: {
        userId: randomUser.id,
        type: template.type,
        title: template.title,
        description: template.description,
        priority: template.priority,
        status: template.status,
      },
    });
    issues.push(issue);
  }

  console.log(`✅ Created ${issues.length} security issues`);

  // Summary
  console.log('\n📊 Seeding Summary:');
  console.log(`   Users: ${users.length}`);
  console.log(`   Issues: ${issues.length}`);
  console.log(`   Cloud Security: ${issues.filter(i => i.type === 'Cloud Security').length}`);
  console.log(`   VAPT: ${issues.filter(i => i.type === 'VAPT').length}`);
  console.log(`   Reteam Assessment: ${issues.filter(i => i.type === 'Reteam Assessment').length}`);
  console.log(`   Open: ${issues.filter(i => i.status === 'open').length}`);
  console.log(`   In Progress: ${issues.filter(i => i.status === 'in-progress').length}`);
  console.log(`   Resolved: ${issues.filter(i => i.status === 'resolved').length}`);
  console.log(`   Critical: ${issues.filter(i => i.priority === 'critical').length}`);
  console.log(`   High: ${issues.filter(i => i.priority === 'high').length}`);
  console.log(`   Medium: ${issues.filter(i => i.priority === 'medium').length}`);
  console.log(`   Low: ${issues.filter(i => i.priority === 'low').length}`);

  console.log('\n✨ Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

