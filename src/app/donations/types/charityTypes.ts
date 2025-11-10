export interface Charity {
  id: string;
  name: string;
  description: string;
  logo: string | File;
}

export interface CharityFormProps {
  initialData?: Charity;
  onCancel?: () => void;
  isEditing?: boolean;
  loading?: boolean;
}

export interface CharityTableProps {
  charities: Charity[];
  onEdit: (charity: Charity) => void;
  onDelete: (id: string) => void;
}
