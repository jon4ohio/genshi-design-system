import { useMemo, useState } from 'react';
import { Box, Button, Input, Stack, Text } from '@genshi/react';

type Employee = {
  id: string;
  name: string;
  role: string;
  location: string;
  status: 'Active' | 'On leave';
};

const EMPLOYEES: Employee[] = [
  { id: '1', name: 'Ada Okonkwo', role: 'Engineering', location: 'Lagos', status: 'Active' },
  { id: '2', name: 'James Chen', role: 'Product Design', location: 'Nairobi', status: 'Active' },
  { id: '3', name: 'Sarah Mensah', role: 'People Operations', location: 'Accra', status: 'On leave' },
  { id: '4', name: 'David Okafor', role: 'Finance', location: 'Lagos', status: 'Active' },
  { id: '5', name: 'Priya Sharma', role: 'Customer Success', location: 'Remote', status: 'Active' },
];

export function App() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return EMPLOYEES;
    return EMPLOYEES.filter(
      (employee) =>
        employee.name.toLowerCase().includes(normalized) ||
        employee.role.toLowerCase().includes(normalized) ||
        employee.location.toLowerCase().includes(normalized)
    );
  }, [query]);

  return (
    <Stack
      gap="large"
      style={{
        maxWidth: '960px',
        margin: '0 auto',
        padding: 'var(--gsh-space-padding-large)',
      }}
    >
      <Stack gap="small">
        <Text as="h1" variant="pageTitle">
          Employee Directory
        </Text>
        <Text variant="caption" color="muted">
          Manage team members across locations
        </Text>
      </Stack>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: 'var(--gsh-space-gap-mid)',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Input
          placeholder="Search by name, role, or location"
          value={query}
          onChange={(event) => setQuery((event.target as HTMLInputElement).value)}
          aria-label="Search employees"
        />
        <Button>Add employee</Button>
      </div>

      {filtered.length === 0 ? (
        <Box padding="large" bordered>
          <Stack gap="small">
            <Text variant="sectionTitle">No employees found</Text>
            <Text color="muted">
              Try a different search term or add a new team member.
            </Text>
            <div>
              <Button intent="neutral" onClick={() => setQuery('')}>
                Clear search
              </Button>
            </div>
          </Stack>
        </Box>
      ) : (
        <Stack gap="small">
          {filtered.map((employee) => (
            <Box key={employee.id} padding="mid" bordered>
              <Stack direction="horizontal" gap="mid" align="center" justify="space-between">
                <Stack gap="small" style={{ minWidth: 0 }}>
                  <Text variant="bodyStrong">{employee.name}</Text>
                  <Text variant="caption" color="muted">
                    {employee.role} · {employee.location}
                  </Text>
                </Stack>
                <Text variant="label" color={employee.status === 'Active' ? 'brand' : 'muted'}>
                  {employee.status}
                </Text>
              </Stack>
            </Box>
          ))}
        </Stack>
      )}

      <Text variant="caption" color="muted">
        {filtered.length} employee{filtered.length === 1 ? '' : 's'}
      </Text>
    </Stack>
  );
}
