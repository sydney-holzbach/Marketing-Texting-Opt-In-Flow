export const TEMPLATE_FOLDERS = [
  { slug: 'all-templates', label: '<All Templates>' },
  { slug: 'amenity-upsell', label: 'Amenity & Upsell Annoucements' },
  { slug: 'community-general', label: 'Community & General' },
  { slug: 'delinquency-legal', label: 'Delinquency & Legal' },
  { slug: 'emergency-alerts', label: 'Emergency & Building Alerts' },
  { slug: 'event-promotions', label: 'Event-Driven Promotions' },
  { slug: 'leasing-move-in', label: 'Leasing & Move-In' },
  { slug: 'maintenance-repairs', label: 'Maintenance & Repairs' },
  { slug: 'move-in-incentives', label: 'Move-In Incentives' },
  { slug: 'notice-compliance', label: 'Notice & Compliance' },
  { slug: 'referral-programs', label: 'Referral Programs' },
  { slug: 'renewal-retention', label: 'Renewal & Retention Offers' },
  { slug: 'renewals-move-out', label: 'Renewals & Move-Out' },
  { slug: 'rent-payments', label: 'Rent & Payments' },
  { slug: 'reviews-reputation', label: 'Reviews & Reputation' },
  { slug: 'seasonal-holiday', label: 'Seasonal & Holiday Promotions' },
  { slug: 'unassigned', label: '<Unassigned Templates>' },
]

export const TEMPLATE_DATA = {
  'renewal-retention': {
    label: 'Renewal & Retention Offers',
    columns: ['Name', 'Description', 'Users'],
    rows: [
      {
        name: 'Early Renewal Discount',
        description:
          'Sent to tenants 60–90 days before lease expiration to incentivize signing early, before the unit is marketed.',
        messageText:
          'Hi [Tenant First Name], great news — renew your lease at [Property Name] before [Renewal Deadline] and lock in [Discount Amount] off your rent. Reply YES to learn more or call the office at [Phone Number].',
        category: 'Leasing',
        promotional: true,
        users: { primary: 'All Selected' },
      },
      {
        name: 'Loyalty/long-term tenant perks',
        description:
          "Sent to tenants who've rented for a set milestone (e.g., 2+ years) to reward continued tenancy. Highlights a perk.",
        messageText:
          "Hi [Tenant First Name], thank you for being a valued resident at [Property Name] for [Years] years! As a thank-you, you've unlocked [Perk Description]. Contact the office at [Phone Number] for details.",
        category: 'Leasing',
        promotional: true,
        users: { primary: 'All Selected' },
      },
      {
        name: '"We\'d love for you to stay" personalized offers',
        description:
          'A warmer, relationship-driven message sent closer to lease-end, referencing the tenant by name and often personalized.',
        messageText:
          "Hi [Tenant First Name], we'd love for you to stay at [Property Name]! We've put together a personalized renewal offer just for you — reply YES or call [Phone Number] to hear more.",
        category: 'Leasing',
        promotional: true,
        users: { primary: 'Alexandra Rivers', extra: 5 },
      },
    ],
  },
  'maintenance-repairs': {
    label: 'Maintenance & Repairs',
    columns: ['Name', 'Description', 'Users'],
    rows: [
      {
        name: 'Work Order Received/Confirmed',
        description:
          'Sent to notify the tenant that their maintenance request was successfully logged into the system, reassures them it is being processed.',
        messageText:
          'Hi [Tenant First Name], this is [Property Name]. Your maintenance request (Work Order #[Work Order Number]) has been received and is being reviewed. We will follow up with next steps shortly.',
        category: 'Maintenance',
        users: { primary: 'All Selected' },
      },
      {
        name: 'Technician On The Way / Arrival Window',
        description:
          'Sent to inform the tenant when a maintenance worker or third-party vendor is en route or scheduled to arrive, including the expected date.',
        messageText:
          'Hi [Tenant First Name], a technician is on the way for Work Order #[Work Order Number] and should arrive between [Arrival Window] on [Date]. Please ensure access to the unit if possible.',
        category: 'Maintenance',
        users: { primary: 'All Selected' },
      },
      {
        name: 'Emergency Water Shut Off',
        description:
          'Sent to notify tenants of an unplanned or emergency water shut-off at the property, including the expected restoration time.',
        messageText:
          'Hi [Tenant.FirstName()], this is Premiere Management Company. Due to an emergency repair, water will be shut off at Riverview Apartments starting at approximately 9:30 AM today, 08/19/2026. We expect service to be restored by 4:30 PM. We apologize for the short notice and any inconvenience. Questions? Call (513) 295-2795.',
        category: 'Maintenance',
        users: { primary: 'All Selected' },
      },
      {
        name: 'Repair Completed',
        description:
          'Template for automated notification that are sent to tenants once a submitted maintenance/repair request has been marked complete.',
        messageText:
          'Hi [Tenant First Name], this is a quick update from [Property Name]. Your recent repair request (Work Order #[Work Order Number]) has been completed. If you have any questions or notice any issues, please contact the office at [Phone Number]. Thank you for your patience!',
        category: 'Maintenance',
        users: { primary: 'Liam Carter', extra: 19 },
      },
      {
        name: 'Follow-up Satisfaction Check',
        description:
          'Sent to gather feedback from the tenant shortly after work is completed to rate their satisfaction with the service and ensure the repair fully resolved.',
        messageText:
          'Hi [Tenant First Name], now that your repair (Work Order #[Work Order Number]) is complete, how did we do? Reply with a rating from 1–5, or call [Phone Number] if anything still needs attention.',
        category: 'Maintenance',
        users: { primary: 'Alexandra Rivers', extra: 5 },
      },
      {
        name: 'Scheduled Maintenance (HVAC filters, pest control, etc.)',
        description:
          'Sent to the tenant to provide advance notice of routine or property-wide preventative servicing, outlining scheduled entry dates, access expectations.',
        messageText:
          'Hi [Tenant First Name], routine [Service Type] is scheduled at [Property Name] on [Date] between [Time Window]. Staff may need to enter your unit — please contact [Phone Number] with any concerns.',
        category: 'Maintenance',
        users: { primary: 'Alexandra Rivers', extra: 5 },
      },
    ],
  },
}
