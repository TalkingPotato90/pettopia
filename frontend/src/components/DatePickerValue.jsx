import { useState } from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function DatePickerValue({ birthday, label, onChange }) {
  const [value, setValue] = useState(dayjs(birthday));

  const handleDateChange = (newValue) => {
    const formattedDate = newValue ? newValue.format('YYYY-MM-DD') : '';
    setValue(newValue);
    onChange(formattedDate);
  };

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      dateFormats={{ monthShort: `M` }}
    >
      <DemoContainer components={['DatePicker', 'DatePicker']}>
        <DatePicker
          required
          label={label}
          value={value}
          onChange={handleDateChange}
          showDaysOutsideCurrentMonth
          format="YYYY-MM-DD"
          maxDate={dayjs()}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
