import React from 'react';

interface PageTitleProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode; // For additional actions like a create button
}

export default function PageTitle({ title, description, icon, children }: PageTitleProps) {
  return (
    <div className="mb-8 pb-4 border-b">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          {icon && <div className="flex-shrink-0">{icon}</div>}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold font-headline tracking-tight">{title}</h1>
            {description && <p className="mt-1 text-muted-foreground">{description}</p>}
          </div>
        </div>
        {children && <div className="flex-shrink-0 mt-4 sm:mt-0">{children}</div>}
      </div>
    </div>
  );
}
