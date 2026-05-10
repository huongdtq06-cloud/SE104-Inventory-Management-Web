import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { MOCK_SHIFTS } from '../data/MOCK_SHIFTS';
import { type Shift, type ShiftFormData } from '../types/shift';

const getAssignedTo = (formData: ShiftFormData) => formData.assignedTo.trim() || null;

const getShiftStatus = (assignedTo: string | null): Shift['status'] => {
  return assignedTo ? 'filled' : 'empty';
};

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const parseLocalDate = (value: string) => {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day);
};

const buildShift = (formData: ShiftFormData, id: string, date: string): Shift => {
  const assignedTo = getAssignedTo(formData);

  return {
    id,
    date,
    startTime: formData.startTime,
    endTime: formData.endTime,
    position: formData.position,
    assignedTo,
    shiftType: formData.shiftType,
    notes: formData.notes,
    status: getShiftStatus(assignedTo),
  };
};

const createRepeatedShifts = (formData: ShiftFormData): Shift[] => {
  const repeatCount = formData.repeatWeekly ? Number(formData.repeatCount) || 1 : 1;
  const startDate = parseLocalDate(formData.date);

  return Array.from({ length: repeatCount }, (_, index) => {
    const shiftDate = new Date(startDate);
    shiftDate.setDate(startDate.getDate() + index * 7);

    return buildShift(formData, `${Date.now()}-${index}`, formatDate(shiftDate));
  });
};

const updateExistingShift = (shift: Shift, formData: ShiftFormData): Shift => {
  return buildShift(formData, shift.id, formData.date);
};

export const getShiftStats = (shifts: Shift[]) => {
  return {
    total: shifts.length,
    empty: shifts.filter((shift) => shift.assignedTo === null || shift.status === 'empty').length,
    urgent: shifts.filter((shift) => shift.status === 'urgent').length,
  };
};

export const getWeekDates = (currentDate: Date) => {
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + index);
    return date;
  });
};

export const useShiftCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const weekDates = useMemo(() => getWeekDates(currentDate), [currentDate]);

  const goToPreviousWeek = () => {
    setCurrentDate((date) => {
      const nextDate = new Date(date);
      nextDate.setDate(date.getDate() - 7);
      return nextDate;
    });
  };

  const goToNextWeek = () => {
    setCurrentDate((date) => {
      const nextDate = new Date(date);
      nextDate.setDate(date.getDate() + 7);
      return nextDate;
    });
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  return {
    currentDate,
    setCurrentDate,
    weekDates,
    goToToday,
    goToNextWeek,
    goToPreviousWeek,
  };
};

export const useShifts = (initialData: Shift[] = MOCK_SHIFTS) => {
  const [shifts, setShifts] = useState<Shift[]>(initialData);
  const stats = useMemo(() => getShiftStats(shifts), [shifts]);

  const deleteShift = (id: string) => {
    setShifts((prev) => prev.filter((shift) => shift.id !== id));
    toast.success('Shift deleted');
  };

  const addShift = (formData: ShiftFormData) => {
    const shiftsToAdd = createRepeatedShifts(formData);
    setShifts((prev) => [...prev, ...shiftsToAdd]);
    toast.success(`${shiftsToAdd.length} shift(s) added successfully`);
  };

  const updateShift = (id: string, formData: ShiftFormData) => {
    setShifts((prev) =>
      prev.map((shift) => (shift.id === id ? updateExistingShift(shift, formData) : shift))
    );
    toast.success('Shift updated successfully');
  };

  return {
    shifts,
    setShifts,
    deleteShift,
    addShift,
    updateShift,
    stats,
    getTotalShifts: () => stats.total,
    getEmptyShiftsCount: () => stats.empty,
    getUrgentCoverageCount: () => stats.urgent,
  };
};
