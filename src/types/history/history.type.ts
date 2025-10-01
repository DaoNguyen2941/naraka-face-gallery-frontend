export type History = {
    id: string;
    slug: string;
    createdAt: string,
    adminId: string,
    module: string,
    action: string,
    description: string,
    recordId: string,
    metadata: unknown,
    ipAddress: string,
    userAgent: string,
};
