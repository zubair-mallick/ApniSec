import { AppError } from '../errors/AppError';

export class IssueValidator {
  private validTypes = ['Cloud Security', 'Reteam Assessment', 'VAPT'];
  private validPriorities = ['low', 'medium', 'high', 'critical'];
  private validStatuses = ['open', 'in-progress', 'resolved', 'closed'];

  validateCreateIssue(data: any) {
    if (!data.type || typeof data.type !== 'string') {
      throw new AppError('Issue type is required', 400);
    }

    if (!this.validTypes.includes(data.type)) {
      throw new AppError(
        `Invalid issue type. Must be one of: ${this.validTypes.join(', ')}`,
        400
      );
    }

    if (!data.title || typeof data.title !== 'string' || data.title.trim().length < 3) {
      throw new AppError('Title must be at least 3 characters long', 400);
    }

    if (!data.description || typeof data.description !== 'string' || data.description.trim().length < 10) {
      throw new AppError('Description must be at least 10 characters long', 400);
    }

    if (data.priority && !this.validPriorities.includes(data.priority)) {
      throw new AppError(
        `Invalid priority. Must be one of: ${this.validPriorities.join(', ')}`,
        400
      );
    }

    if (data.status && !this.validStatuses.includes(data.status)) {
      throw new AppError(
        `Invalid status. Must be one of: ${this.validStatuses.join(', ')}`,
        400
      );
    }
  }

  validateUpdateIssue(data: any) {
    if (data.type && !this.validTypes.includes(data.type)) {
      throw new AppError(
        `Invalid issue type. Must be one of: ${this.validTypes.join(', ')}`,
        400
      );
    }

    if (data.title && (typeof data.title !== 'string' || data.title.trim().length < 3)) {
      throw new AppError('Title must be at least 3 characters long', 400);
    }

    if (data.description && (typeof data.description !== 'string' || data.description.trim().length < 10)) {
      throw new AppError('Description must be at least 10 characters long', 400);
    }

    if (data.priority && !this.validPriorities.includes(data.priority)) {
      throw new AppError(
        `Invalid priority. Must be one of: ${this.validPriorities.join(', ')}`,
        400
      );
    }

    if (data.status && !this.validStatuses.includes(data.status)) {
      throw new AppError(
        `Invalid status. Must be one of: ${this.validStatuses.join(', ')}`,
        400
      );
    }
  }

  validateIssueType(type: string) {
    if (!this.validTypes.includes(type)) {
      throw new AppError(
        `Invalid issue type. Must be one of: ${this.validTypes.join(', ')}`,
        400
      );
    }
  }

  validateIssueStatus(status: string) {
    if (!this.validStatuses.includes(status)) {
      throw new AppError(
        `Invalid status. Must be one of: ${this.validStatuses.join(', ')}`,
        400
      );
    }
  }
}
