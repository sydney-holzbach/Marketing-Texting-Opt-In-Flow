export const TENANTS = [
  { id: 1, name: 'Charlie Apegian', property: 'Riverview Apartments', unit: '120B', phone: '(847) 123-4567', phoneStatus: 'verified', leaseStart: '01/01/2026', leaseEnd: '12/31/2026', status: 'Current', consent: { informational: true, promotional: true } },
  { id: 2, name: 'Kiley Donahue', property: 'Riverview Apartments', unit: 'C', phone: '(167) 345-6789', phoneStatus: 'pending', leaseStart: '01/01/2026', leaseEnd: '12/31/2026', status: 'Current', consent: { informational: true, promotional: false } },
  { id: 3, name: 'Jaxon Frami', property: 'Riverview Apartments', unit: '1B', phone: '(415) 947-0123', phoneStatus: 'verified', leaseStart: '01/01/2026', leaseEnd: '12/31/2026', status: 'Current', consent: { informational: true, promotional: true } },
  { id: 4, name: 'Solon Crona', property: 'Riverview Apartments', unit: '4', phone: '(513) 987-6543', phoneStatus: 'sms', leaseStart: '01/01/2026', leaseEnd: '12/31/2026', status: 'Current', consent: { informational: true, promotional: true } },
  { id: 5, name: 'Lacey Bartell', property: 'Riverview Apartments', unit: '14', phone: '(513) 592-7259', phoneStatus: 'verified', leaseStart: '01/01/2026', leaseEnd: '12/31/2026', status: 'Current', consent: { informational: true, promotional: true } },
  { id: 6, name: 'Arlo Swift', property: 'Riverview Apartments', unit: 'Lot A', phone: '(283) 456-7890', phoneStatus: 'invalid', leaseStart: '01/01/2026', leaseEnd: '12/31/2026', status: 'Current', consent: { informational: false, promotional: false } },
  { id: 7, name: 'Kenton Emard', property: 'Riverview Apartments', unit: '8', phone: '(513) 567-8901', phoneStatus: 'verified', leaseStart: '01/01/2026', leaseEnd: '12/31/2026', status: 'Current', consent: { informational: true, promotional: true } },
  { id: 8, name: 'Eli Beer', property: 'Riverview Apartments', unit: '12', phone: '(283) 789-0123', phoneStatus: 'invalid', leaseStart: '01/01/2026', leaseEnd: '12/31/2026', status: 'Current', consent: { informational: false, promotional: false } },
  { id: 9, name: 'Shea Trantow', property: 'Riverview Apartments', unit: '24', phone: '(847) 555-0198', phoneStatus: 'pending', leaseStart: '01/01/2026', leaseEnd: '12/31/2026', status: 'Current', consent: { informational: true, promotional: false } },
  { id: 10, name: 'Doug Pfeffer', property: 'Riverview Apartments', unit: '6', phone: '(619) 234-7890', phoneStatus: 'pending', leaseStart: '01/01/2026', leaseEnd: '12/31/2026', status: 'Current', consent: { informational: true, promotional: true } },
  { id: 11, name: 'Tod Corkery', property: 'Riverview Apartments', unit: '111B', phone: '(194) 295-1895', phoneStatus: 'verified', leaseStart: '01/01/2026', leaseEnd: '12/31/2026', status: 'Current', consent: { informational: true, promotional: true } },
  { id: 12, name: 'Kobe Bayer', property: 'Riverview Apartments', unit: '10', phone: '(212) 555-0134', phoneStatus: 'invalid', leaseStart: '01/01/2026', leaseEnd: '12/31/2025', status: 'Current', consent: { informational: true, promotional: true } },
  { id: 13, name: 'Jayson Ankunding', property: 'Riverview Apartments', unit: '3', phone: '(415) 678-9012', phoneStatus: 'pending', leaseStart: '06/01/2025', leaseEnd: '12/31/2025', status: 'Past', consent: { informational: true, promotional: false } },
  { id: 14, name: 'Gussie Jast', property: 'Riverview Apartments', unit: 'F', phone: '(415) 947-0123', phoneStatus: 'verified', leaseStart: '06/01/2025', leaseEnd: '12/31/2025', status: 'Past', consent: { informational: true, promotional: true } },
  { id: 15, name: 'Crystel Crist', property: 'Riverview Apartments', unit: '100E', phone: '(513) 234-5678', phoneStatus: 'invalid', leaseStart: '06/01/2025', leaseEnd: '12/31/2025', status: 'Past', consent: { informational: false, promotional: false } },
]

export function optOutCount(tenantIds, variant) {
  return TENANTS.filter((t) => tenantIds.includes(t.id) && !t.consent[variant]).length
}
