# NPHCDA Staff Management System - Documentation

## 1. System Architecture
The system follows a modern **Cloud-Native Decoupled Architecture**:
- **Frontend Layer**: React 19 SPA with role-based routing and localized state management.
- **API Layer**: RESTful and Realtime interfaces via Supabase PostgREST.
- **Storage Layer**: PostgreSQL for structured data, Supabase Storage for certificates and letters.
- **Security Layer**: Integrated Auth with JWT-based Row Level Security (RLS).

## 2. Key Data Privacy & Security Measures
1. **End-to-End Encryption**: All sensitive biodata and financial records encrypted at rest (AES-256) and in transit (TLS 1.3).
2. **Granular RBAC**: 
   - *Super Admin*: Full visibility, audit logs, system configuration.
   - *Dept Admin*: Team-specific read/write, approval authorities.
   - *Staff*: Self-service view/edit for personal data only.
3. **Audit Trails**: Every modification to staff rank, salary, or posting is logged with a timestamp and user ID.
4. **Geolocation Verification**: Prevents "proxy" attendance by ensuring check-ins occur within agency-defined geofences.
5. **NDPA Compliance**: Features for data rectification, right to be forgotten (anonymization), and purpose limitation.

## 3. Stakeholder Discovery Questions (Top 10)
1. How is IPPIS currently integrated? (API vs. Manual File Export)
2. What are the specific geofence radii for field staff at various PHC locations?
3. How many levels of approval are required for a Promotion vs. a Leave request?
4. Are there legacy paper records that need a dedicated bulk-migration phase?
5. What specific KPIs are used for different cadres (e.g., Medical vs. Admin)?
6. How should offline data sync handle conflicts when multiple staff sync from the same location?
7. What are the specific Nigerian Public Service Rules for automatic leave accruals?
8. Which donor partners (WHO, UNICEF, Gavi) require automated reporting access?
9. Is there a need for SMS-based notifications for staff in areas with low data?
10. What is the current process for asset recovery when a staff member leaves?

## 4. Implementation Roadmap
### Phase 1: Foundation (Months 1-3)
- Database schema deployment in Supabase.
- Auth & RBAC setup.
- Staff Registry (Biodata & Employment history).
- Basic Leave Management.

### Phase 2: Operational Efficiency (Months 4-6)
- Geolocation Attendance module.
- Performance Management (KPIs & Reviews).
- Training Catalog & Enrollment.
- Document Manager for staff records.

### Phase 3: Integration & Intelligence (Months 7-9)
- Project-based Allowance (Payroll) integration.
- Advanced Analytics Dashboard & Automated Reporting.
- Offline-first mobile app capabilities.
- API connectivity for IPPIS/External systems.