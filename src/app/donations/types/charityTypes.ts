export interface Charity {
  id: string;
  name: string;
  description: string;
  logo: string | File;
}

export interface CharityFormProps {
  onSubmit: (charity: Omit<Charity, 'id'>) => void;
  initialData?: Charity;
  onCancel?: () => void;
  isEditing?: boolean;
}

export interface CharityTableProps {
  charities: Charity[];
  onEdit: (charity: Charity) => void;
  onDelete: (id: string) => void;
}