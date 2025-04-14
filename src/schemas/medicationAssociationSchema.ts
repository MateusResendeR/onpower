import { z } from 'zod';
import { ADMINISTRATION_ROUTES } from '../components/clinicComponents/MedicationsComponets/AssociateMedicianalMoral.tsx';

export const medicationAssociationSchema = z.object({
  
  medicineId: z.number().or(z.string())
    .refine(val => !!val, { message: "Medicamento não selecionado" }),
  
  startDate: z.string()
    .min(1, { message: "Data de início é obrigatória" })
    .refine(date => {
      const parsed = new Date(date);
      return !isNaN(parsed.getTime());
    }, { message: "Data de início inválida" }),
  
  endDate: z.string()
    .min(1, { message: "Data de término é obrigatória" })
    .refine(date => {
      const parsed = new Date(date);
      return !isNaN(parsed.getTime());
    }, { message: "Data de término inválida" }),
  
  dosage: z.string()
    .min(1, { message: "Dosagem é obrigatória" }),
  
  administrationRoute: z.string()
    .min(1, { message: "Via de administração é obrigatória" })
    .refine(val => ADMINISTRATION_ROUTES.includes(val), { 
      message: "Via de administração inválida" 
    }),
  
  timesPerDay: z.number()
    .min(1, { message: "Deve ser pelo menos 1 vez ao dia" }),
  
  quantity: z.number()
    .min(1, { message: "Quantidade deve ser pelo menos 1" }),
  
  notes: z.string().default(""),
});

export interface MedicationAssociationForm {
  patientId: number;
  medicineId: string | number;
  startDate: string;
  endDate: string;
  timesPerDay: number;
  quantity: number;
  dosage: string;
  administrationRoute: string;
  notes: string;
}

// Tipo da MedicinePatient para compatibilidade
export interface MedicinePatient {
  id?: number | string;
  medicineId: number | string;
  patientId: number;
  startDate: string;
  endDate: string;
  timesADay: number;
  amount: number;
  note: string; 
  // Outros campos que podem existir
  medicineName?: string;
  patientName?: string;
  dosage?: string;
}

// Validação para verificar se a data de término é posterior à data de início
export const validateDateRange = (startDate: string, endDate: string): string | null => {
  if (!startDate || !endDate) return null;

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (end < start) {
    return "A data de término deve ser posterior à data de início";
  }

  return null;
};