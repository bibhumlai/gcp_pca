import { useState } from "react";

const COLORS = {
  bg: "#0a0f1e",
  surface: "#0f1729",
  card: "#131d35",
  border: "#1e2d4a",
  accent: "#4285F4",
  green: "#34A853",
  yellow: "#FBBC05",
  red: "#EA4335",
  teal: "#00BCD4",
  purple: "#9C27B0",
  text: "#e8eaf6",
  muted: "#8892b0",
  bright: "#ffffff",
};

const NAV = [
  { id: "overview", label: "Overview", icon: "🗺️" },
  { id: "compute", label: "Compute", icon: "⚙️" },
  { id: "storage", label: "Storage & DB", icon: "🗄️" },
  { id: "networking", label: "Networking", icon: "🌐" },
  { id: "security", label: "Security & IAM", icon: "🔐" },
  { id: "aiml", label: "AI/ML & Vertex", icon: "🧠" },
  { id: "operations", label: "Operations", icon: "📊" },
  { id: "case-cymbal", label: "Cymbal Retail", icon: "🛍️" },
  { id: "case-alto", label: "Altostrat Media", icon: "🎬" },
  { id: "case-ehr", label: "EHR Healthcare", icon: "🏥" },
  { id: "case-knight", label: "KnightMotives", icon: "🚗" },
  { id: "framework", label: "Architecture Framework", icon: "🏛️" },
];

function Badge({ label, color = COLORS.accent }) {
  return (
    <span style={{
      background: color + "22", color, border: `1px solid ${color}44`,
      borderRadius: 4, padding: "2px 8px", fontSize: 11, fontWeight: 700,
      letterSpacing: 0.5, marginRight: 4, display: "inline-block"
    }}>{label}</span>
  );
}

function SectionHeader({ icon, title, subtitle }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
        <span style={{ fontSize: 32 }}>{icon}</span>
        <h2 style={{ color: COLORS.bright, fontSize: 26, fontWeight: 800, margin: 0 }}>{title}</h2>
      </div>
      {subtitle && <p style={{ color: COLORS.muted, marginLeft: 44, fontSize: 14 }}>{subtitle}</p>}
      <div style={{ height: 2, background: `linear-gradient(90deg, ${COLORS.accent}, transparent)`, marginTop: 12 }} />
    </div>
  );
}

function DecisionMatrix({ title, rows }) {
  return (
    <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 10, overflow: "hidden", marginBottom: 24 }}>
      <div style={{ background: COLORS.accent + "18", padding: "12px 16px", borderBottom: `1px solid ${COLORS.border}` }}>
        <span style={{ color: COLORS.accent, fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: 1 }}>⚖️ {title}</span>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: COLORS.surface }}>
              {rows[0].map((h, i) => (
                <th key={i} style={{ padding: "10px 14px", textAlign: "left", color: COLORS.muted, fontWeight: 600, borderBottom: `1px solid ${COLORS.border}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.slice(1).map((row, ri) => (
              <tr key={ri} style={{ borderBottom: `1px solid ${COLORS.border}22` }}>
                {row.map((cell, ci) => (
                  <td key={ci} style={{ padding: "10px 14px", color: ci === 0 ? COLORS.bright : COLORS.text, fontWeight: ci === 0 ? 700 : 400 }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Card({ title, children, accent = COLORS.accent, tag }) {
  return (
    <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderLeft: `3px solid ${accent}`, borderRadius: 8, padding: 20, marginBottom: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <h3 style={{ color: COLORS.bright, fontSize: 15, fontWeight: 700, margin: 0 }}>{title}</h3>
        {tag && <Badge label={tag} color={accent} />}
      </div>
      {children}
    </div>
  );
}

function Callout({ type = "info", children }) {
  const styles = {
    info: { bg: COLORS.accent + "15", border: COLORS.accent, icon: "💡" },
    warn: { bg: COLORS.yellow + "15", border: COLORS.yellow, icon: "⚠️" },
    tip: { bg: COLORS.green + "15", border: COLORS.green, icon: "✅" },
    danger: { bg: COLORS.red + "15", border: COLORS.red, icon: "🚨" },
  };
  const s = styles[type];
  return (
    <div style={{ background: s.bg, border: `1px solid ${s.border}44`, borderRadius: 8, padding: "12px 16px", marginBottom: 16, display: "flex", gap: 10 }}>
      <span style={{ fontSize: 16 }}>{s.icon}</span>
      <div style={{ color: COLORS.text, fontSize: 13, lineHeight: 1.6 }}>{children}</div>
    </div>
  );
}

function Li({ children, accent = COLORS.muted }) {
  return <li style={{ color: COLORS.text, fontSize: 13, lineHeight: 1.8, marginBottom: 4, listStyle: "none", paddingLeft: 16, position: "relative" }}>
    <span style={{ position: "absolute", left: 0, color: accent }}>›</span>
    {children}
  </li>;
}

function QuestionBox({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 8, marginBottom: 10, overflow: "hidden" }}>
      <div onClick={() => setOpen(!open)} style={{ padding: "12px 16px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
        <p style={{ color: COLORS.text, fontSize: 13, margin: 0, fontWeight: 500, lineHeight: 1.5 }}>🎯 {question}</p>
        <span style={{ color: COLORS.accent, fontSize: 18, flexShrink: 0 }}>{open ? "▲" : "▼"}</span>
      </div>
      {open && (
        <div style={{ padding: "0 16px 14px", borderTop: `1px solid ${COLORS.border}` }}>
          <p style={{ color: COLORS.green, fontSize: 13, lineHeight: 1.6, margin: "12px 0 0" }}>✅ {answer}</p>
        </div>
      )}
    </div>
  );
}

// ─── SECTIONS ────────────────────────────────────────────────────────────────

function Overview() {
  return (
    <div>
      <SectionHeader icon="🗺️" title="GCP PCA Exam Overview" subtitle="Professional Cloud Architect — Certification Blueprint & Exam Strategy" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 28 }}>
        {[
          { label: "Exam Duration", value: "2 hours", icon: "⏱️", color: COLORS.accent },
          { label: "Question Format", value: "~60 MCQ/MRSQ", icon: "📝", color: COLORS.green },
          { label: "Passing Score", value: "~70%", icon: "🎯", color: COLORS.yellow },
          { label: "Case Studies", value: "4 Official", icon: "📋", color: COLORS.teal },
        ].map(item => (
          <div key={item.label} style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 20, textAlign: "center" }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
            <div style={{ color: item.color, fontWeight: 800, fontSize: 22, marginBottom: 4 }}>{item.value}</div>
            <div style={{ color: COLORS.muted, fontSize: 12, textTransform: "uppercase", letterSpacing: 1 }}>{item.label}</div>
          </div>
        ))}
      </div>

      <DecisionMatrix title="Exam Domain Weights" rows={[
        ["Domain", "Topics Covered", "Approx. Weight"],
        ["1. Designing Cloud Solutions", "Architecture, compute selection, storage decisions", "~30%"],
        ["2. Managing & Provisioning", "Deployment, IaC, migration planning", "~25%"],
        ["3. Security & Compliance", "IAM, VPC, encryption, audit logging", "~20%"],
        ["4. Analyzing & Optimizing", "Cost, performance, reliability, SRE", "~15%"],
        ["5. Ensuring Reliability", "DR, HA, multi-region, SLOs/SLAs", "~10%"],
      ]} />

      <Callout type="warn">
        <strong>Exam Strategy:</strong> Case studies (Cymbal Retail, Altostrat, EHR Healthcare, KnightMotives) appear as dedicated tabs during the exam. Read them BEFORE exam day — scenarios reference their requirements directly. Always map answers back to business requirements, not just technical ones.
      </Callout>

      <Card title="Key Mindset Shifts for PCA Success" accent={COLORS.green}>
        <ul style={{ margin: 0, padding: 0 }}>
          <Li accent={COLORS.green}><strong>Cost over performance when both work:</strong> GCP exam favors cost-optimized, managed services.</Li>
          <Li accent={COLORS.green}><strong>Managed &gt; Self-managed:</strong> Cloud Run over GKE, Spanner over manual HA PostgreSQL, etc.</Li>
          <Li accent={COLORS.green}><strong>Least Privilege Always:</strong> Every IAM question = minimum required role.</Li>
          <Li accent={COLORS.green}><strong>Global Resilience:</strong> Questions test whether you choose global/multi-region vs regional vs zonal correctly.</Li>
          <Li accent={COLORS.green}><strong>Data gravity:</strong> Place compute near data. BigQuery in same region as source data.</Li>
        </ul>
      </Card>

      <Card title="Official Google Cloud Architecture Framework Pillars" accent={COLORS.purple}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 10 }}>
          {[
            { pillar: "Operational Excellence", icon: "⚙️", color: COLORS.accent },
            { pillar: "Security & Compliance", icon: "🔐", color: COLORS.red },
            { pillar: "Reliability", icon: "🛡️", color: COLORS.green },
            { pillar: "Performance Optimization", icon: "⚡", color: COLORS.yellow },
            { pillar: "Cost Optimization", icon: "💰", color: COLORS.teal },
          ].map(p => (
            <div key={p.pillar} style={{ background: COLORS.surface, borderRadius: 8, padding: "12px", textAlign: "center", border: `1px solid ${p.color}33` }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{p.icon}</div>
              <div style={{ color: p.color, fontSize: 12, fontWeight: 700 }}>{p.pillar}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function Compute() {
  return (
    <div>
      <SectionHeader icon="⚙️" title="Compute Services" subtitle="Decision frameworks for choosing the right compute platform on every question" />

      <Callout type="info">
        <strong>The Golden Decision Tree:</strong> Can it be stateless &amp; containerized? → Cloud Run first. Need GPU/specialised hardware? → GCE. Need Kubernetes orchestration/stateful workloads at scale? → GKE. Monolith migration? → App Engine Flex or GCE.
      </Callout>

      <DecisionMatrix title="Core Compute Decision Matrix" rows={[
        ["Service", "Best For", "NOT For", "Key Differentiator"],
        ["Cloud Run", "Stateless microservices, HTTP workloads, event-driven scale-to-zero", "Stateful apps, long-running background jobs >60min, GPU", "Fully managed, pay-per-request, auto-scale to zero"],
        ["GKE Autopilot", "Container workloads needing K8s features, ML pipelines, mixed workloads", "Simple HTTP APIs (use Cloud Run), single VMs", "Managed K8s control plane + node pools"],
        ["GKE Standard", "Custom node configs, GPUs, TPUs, privileged containers, advanced networking", "Cost-sensitive simple workloads", "Full K8s control, node-level management"],
        ["App Engine Standard", "Python/Java/Go web apps, rapid scaling, no container management", "Custom runtimes, long processing, GPU workloads", "Serverless, automatic scaling, language-specific sandboxes"],
        ["App Engine Flex", "Custom runtimes, long-running requests, WebSockets, legacy migration", "Greenfield microservices (use Cloud Run)", "Docker containers, GCE VMs underneath"],
        ["Compute Engine", "Lift-and-shift VMs, GPU/TPU workloads, licensed software, SAP, bare-metal", "Cloud-native greenfield", "Full VM control, custom machine types, Spot VMs"],
        ["Cloud Functions (2nd gen)", "Lightweight event-driven functions, Pub/Sub triggers, webhook handlers", "Long-running, CPU-intensive tasks", "Sub-second billing, event-driven, no server mgmt"],
        ["Batch", "HPC, large-scale parallel jobs, scientific computing, rendering", "Real-time processing, interactive apps", "Managed HPC batch scheduling on GCE"],
      ]} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        <Card title="GKE Autopilot vs Standard" accent={COLORS.teal} tag="KEY EXAM TOPIC">
          <ul style={{ margin: 0, padding: 0 }}>
            <Li accent={COLORS.teal}><strong>Autopilot:</strong> Google manages nodes, node pools, scaling. Pay per Pod resource request. Less operational overhead. Choose for most new K8s workloads.</Li>
            <Li accent={COLORS.teal}><strong>Standard:</strong> You manage node pools. Required for: DaemonSets, privileged containers, custom node machine types, GPUs, TPUs, host networking.</Li>
            <Li accent={COLORS.teal}><strong>Exam trick:</strong> If a scenario mentions needing GPUs in K8s → GKE Standard. If it mentions "reduce ops burden" + containers → GKE Autopilot or Cloud Run.</Li>
          </ul>
        </Card>

        <Card title="Preemptible/Spot VMs Strategy" accent={COLORS.yellow} tag="COST OPTIMIZATION">
          <ul style={{ margin: 0, padding: 0 }}>
            <Li accent={COLORS.yellow}><strong>Spot VMs:</strong> Up to 91% cost savings. Can be reclaimed by Google at any time with 30s notice.</Li>
            <Li accent={COLORS.yellow}><strong>Use for:</strong> Batch jobs, fault-tolerant ML training, rendering, data pipelines.</Li>
            <Li accent={COLORS.yellow}><strong>NOT for:</strong> Databases, stateful apps, customer-facing APIs with strict SLAs.</Li>
            <Li accent={COLORS.yellow}><strong>MIG + Spot:</strong> Use Managed Instance Groups with auto-healing + Spot VMs for cost-optimised scalable batch processing.</Li>
          </ul>
        </Card>
      </div>

      <Card title="Autoscaling & High Availability Patterns" accent={COLORS.green}>
        <ul style={{ margin: 0, padding: 0 }}>
          <Li accent={COLORS.green}><strong>MIGs (Managed Instance Groups):</strong> Use for stateless GCE workloads. Supports autohealing, autoscaling, rolling updates. Regional MIG = HA across zones.</Li>
          <Li accent={COLORS.green}><strong>Cloud Run concurrency:</strong> Default 80 requests/container instance. Adjust min-instances to eliminate cold starts for latency-sensitive workloads.</Li>
          <Li accent={COLORS.green}><strong>GKE HPA vs VPA:</strong> HPA scales replicas based on CPU/custom metrics. VPA adjusts resource requests. Use HPA for variable traffic, VPA for right-sizing.</Li>
          <Li accent={COLORS.green}><strong>GKE Node Auto Provisioner:</strong> Automatically creates node pools optimized for pending Pods. Ideal for mixed GPU/CPU workloads.</Li>
        </ul>
      </Card>

      <QuestionBox
        question="A media company runs a video transcoding workload that takes 4-6 hours per job and can tolerate occasional interruptions. They want to minimize costs. What compute solution is best?"
        answer="Compute Engine Spot VMs in a Managed Instance Group with auto-healing and checkpointing logic. Spot VMs provide up to 91% savings. The long duration and fault tolerance fit Spot perfectly. Use Cloud Storage for intermediate checkpoint storage so jobs can resume after preemption."
      />
      <QuestionBox
        question="A startup needs to deploy 15 containerized microservices. They have no Kubernetes expertise and want minimal operations. Which compute option is most appropriate?"
        answer="Cloud Run. Each microservice deploys independently, scales to zero when idle (cost savings), handles HTTP/gRPC natively, requires zero Kubernetes knowledge, and integrates with Cloud Build for CI/CD. Only use GKE if they need inter-service service mesh features or stateful workloads."
      />
    </div>
  );
}

function Storage() {
  return (
    <div>
      <SectionHeader icon="🗄️" title="Storage & Databases" subtitle="The most complex decision domain — master these matrices to ace 20%+ of exam questions" />

      <DecisionMatrix title="Storage Service Decision Matrix" rows={[
        ["Service", "Data Model", "Scale", "Latency", "Best Use Case"],
        ["Cloud SQL", "Relational (MySQL/PG/MSSQL)", "Up to 96 vCPU, 624GB RAM", "~5ms", "Traditional OLTP apps, lift-and-shift, WordPress, ERP"],
        ["Cloud Spanner", "Relational + Distributed", "Unlimited (global)", "~5ms regional, ~10ms global", "Global ACID transactions, financial systems, gaming leaderboards"],
        ["Firestore", "Document (NoSQL)", "Millions of docs", "~10ms", "Mobile/web apps, user profiles, real-time sync, offline"],
        ["Bigtable", "Wide-column (NoSQL)", "Petabytes", "<10ms at scale", "Time-series, IoT, financial ticks, AdTech, ML features"],
        ["BigQuery", "Columnar analytical (OLAP)", "Exabytes", "Seconds (queries)", "Data warehouse, analytics, ML, reporting, BI dashboards"],
        ["Memorystore (Redis)", "In-memory key-value", "Up to 300GB", "Sub-ms", "Caching, session store, leaderboards, pub/sub"],
        ["AlloyDB", "PostgreSQL-compatible", "Scales to 128TB", "~2ms", "High-perf PG workloads, analytics on OLTP, AI-ready"],
        ["Firestore in Datastore mode", "Document (legacy)", "Millions of docs", "~10ms", "Existing App Engine Datastore apps migration"],
      ]} />

      <Callout type="warn">
        <strong>Critical Exam Decision — Spanner vs Cloud SQL:</strong> Choose Spanner ONLY when you need: (1) global distribution with strong consistency, OR (2) horizontal scaling beyond a single Cloud SQL instance, OR (3) &gt;99.999% SLA requirements. Cloud SQL is cheaper and sufficient for most OLTP. Spanner costs 10x more.
      </Callout>

      <DecisionMatrix title="Database Selection Decision Tree" rows={[
        ["Requirement", "Choose This", "Reason"],
        ["Need ACID transactions, relational, single-region", "Cloud SQL", "Managed MySQL/PostgreSQL/SQL Server"],
        ["Need ACID transactions, global consistency, horizontal scale", "Cloud Spanner", "The only globally distributed RDBMS"],
        ["Need high-performance PostgreSQL + analytics", "AlloyDB", "Columnar engine for HTAP workloads"],
        ["Mobile app with offline sync, real-time updates", "Firestore", "Client SDK with offline cache, real-time listeners"],
        ["Billions of rows, high-throughput reads/writes, IoT/time-series", "Bigtable", "Wide-column, HBase-compatible, sub-10ms at petabyte scale"],
        ["Analytics, data warehouse, SQL at scale, ML", "BigQuery", "Serverless OLAP, pay-per-query or flat-rate"],
        ["Sub-millisecond cache, session management", "Memorystore Redis/Valkey", "Fully managed Redis, no cold-start penalty"],
        ["Unstructured files, objects, blobs, backups", "Cloud Storage", "Object store, 11 nines durability, lifecycle mgmt"],
      ]} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        <Card title="Cloud Storage Class Selection" accent={COLORS.accent} tag="COST">
          <ul style={{ margin: 0, padding: 0 }}>
            <Li accent={COLORS.accent}><strong>Standard:</strong> Hot data, frequent access (&gt;1x/month). No minimum storage duration.</Li>
            <Li accent={COLORS.accent}><strong>Nearline:</strong> Accessed ~1x/month. 30-day minimum. Backup, infrequent reports.</Li>
            <Li accent={COLORS.accent}><strong>Coldline:</strong> Accessed ~1x/quarter. 90-day minimum. DR archives, audit logs.</Li>
            <Li accent={COLORS.accent}><strong>Archive:</strong> Accessed &lt;1x/year. 365-day minimum. Compliance archives, 7-year retention logs.</Li>
            <Li accent={COLORS.accent}><strong>Autoclass:</strong> Automatically moves objects between classes. Best when access patterns are unpredictable.</Li>
          </ul>
        </Card>

        <Card title="BigQuery Key Patterns" accent={COLORS.yellow} tag="HIGH FREQUENCY">
          <ul style={{ margin: 0, padding: 0 }}>
            <Li accent={COLORS.yellow}><strong>Partitioning:</strong> Partition by date/timestamp columns or ingestion time. Reduces bytes scanned = cost savings.</Li>
            <Li accent={COLORS.yellow}><strong>Clustering:</strong> Cluster by high-cardinality filter columns (user_id, country). Works with partitioning.</Li>
            <Li accent={COLORS.yellow}><strong>Slots:</strong> On-demand = pay per TB. Flat-rate = reserved slots, predictable cost for heavy workloads.</Li>
            <Li accent={COLORS.yellow}><strong>BigQuery ML:</strong> Train/run ML models with SQL. No data movement. Great for in-place analytics + predictions.</Li>
            <Li accent={COLORS.yellow}><strong>BI Engine:</strong> In-memory cache for sub-second dashboards (Looker Studio, etc.).</Li>
          </ul>
        </Card>
      </div>

      <Card title="Data Transfer & Migration Services" accent={COLORS.teal}>
        <ul style={{ margin: 0, padding: 0 }}>
          <Li accent={COLORS.teal}><strong>Storage Transfer Service:</strong> Move data from S3, Azure Blob, or on-prem HTTP/HTTPS to Cloud Storage. Scheduled, large-scale transfers.</Li>
          <Li accent={COLORS.teal}><strong>Transfer Appliance:</strong> Physical device for &gt;20TB offline transfers. Use when bandwidth is insufficient.</Li>
          <Li accent={COLORS.teal}><strong>Database Migration Service (DMS):</strong> Minimal-downtime migrations for MySQL, PostgreSQL, SQL Server, Oracle → Cloud SQL or AlloyDB.</Li>
          <Li accent={COLORS.teal}><strong>Datastream:</strong> CDC (Change Data Capture) for real-time replication from Oracle/MySQL/PostgreSQL → BigQuery or Cloud SQL.</Li>
          <Li accent={COLORS.teal}><strong>BigQuery Data Transfer Service:</strong> Scheduled ingestion from Google Ads, YouTube, Campaign Manager → BigQuery automatically.</Li>
        </ul>
      </Card>

      <QuestionBox
        question="An e-commerce platform processes 50,000 financial transactions/second globally. Users in Tokyo and New York must see consistent inventory counts. What database fits?"
        answer="Cloud Spanner. It's the only database that offers globally distributed, strongly consistent ACID transactions at unlimited horizontal scale. Cloud SQL can't scale globally with strong consistency. Bigtable is eventually consistent by default. Spanner's TrueTime API ensures global linearizability."
      />
      <QuestionBox
        question="A company stores 200TB of raw access logs in Cloud Storage. They query these logs 2-3 times per year for compliance audits. How should they optimize storage cost?"
        answer="Move logs to Archive storage class using Object Lifecycle Management policies. Set a lifecycle rule to transition objects to Archive after 30 days. The 365-day minimum retention and per-operation retrieval fees are acceptable for annual compliance queries. Total cost savings: ~85% vs Standard storage."
      />
    </div>
  );
}

function Networking() {
  return (
    <div>
      <SectionHeader icon="🌐" title="Networking" subtitle="VPC design, hybrid connectivity, and load balancing — 15-20% of exam questions" />

      <DecisionMatrix title="Hybrid Connectivity Decision Matrix" rows={[
        ["Connectivity Type", "Bandwidth", "SLA", "Latency", "Best For"],
        ["Cloud Interconnect (Dedicated)", "10/100 Gbps", "99.99% with 2 circuits", "Lowest (direct fiber)", "Enterprises with high-bandwidth, latency-sensitive workloads"],
        ["Cloud Interconnect (Partner)", "50Mbps–10Gbps", "99.99% with redundancy", "Low", "When direct colo access is unavailable; use service provider"],
        ["HA VPN", "Up to 3 Gbps per tunnel", "99.99% with 2 tunnels", "~10-50ms (internet)", "Encrypted site-to-site, moderate bandwidth, cost-effective"],
        ["Classic VPN", "Up to 3 Gbps", "99.9% SLA", "~10-50ms", "Legacy, dev/test, single tunnel. Avoid for production"],
        ["Cloud CDN", "N/A (edge caching)", "N/A", "Sub-ms (edge PoP)", "Static content, media streaming, global cache"],
        ["Media CDN", "N/A", "N/A", "Sub-ms", "Video streaming at scale, high-throughput media"],
      ]} />

      <Callout type="info">
        <strong>HA VPN SLA Rule:</strong> To achieve 99.99% SLA on HA VPN, you MUST configure 2 VPN tunnels across 2 VPN gateways. A single HA VPN with 1 tunnel only gives 99.9% SLA. This is a frequent exam trap.
      </Callout>

      <DecisionMatrix title="Load Balancer Selection Matrix" rows={[
        ["Load Balancer", "Scope", "Protocol", "Best For"],
        ["Global External HTTP(S) LB", "Global, Anycast IP", "HTTP/HTTPS/HTTP2", "Web apps, APIs requiring global reach, Cloud CDN integration"],
        ["Regional External HTTP(S) LB", "Regional", "HTTP/HTTPS", "Regional web apps, data residency requirements"],
        ["External TCP/UDP Network LB", "Regional", "TCP/UDP", "Non-HTTP protocols, gaming, VoIP, pass-through NLB"],
        ["Internal HTTP(S) LB", "Regional (internal)", "HTTP/HTTPS", "Internal microservices, Service Mesh, GKE internal services"],
        ["Internal TCP/UDP LB", "Regional (internal)", "TCP/UDP", "Internal VMs, 3-tier architectures, internal TCP services"],
        ["Global SSL Proxy LB", "Global", "SSL/TLS (not HTTP)", "SSL-terminated non-HTTP TCP services globally"],
      ]} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        <Card title="VPC Design Fundamentals" accent={COLORS.accent} tag="CRITICAL">
          <ul style={{ margin: 0, padding: 0 }}>
            <Li accent={COLORS.accent}><strong>Shared VPC:</strong> Centralized network in a host project, shared to service projects. Use for multi-team orgs where networking is managed centrally by a network team.</Li>
            <Li accent={COLORS.accent}><strong>VPC Peering:</strong> Connect two VPCs (same or different org). Not transitive — A peers B, B peers C, A cannot reach C.</Li>
            <Li accent={COLORS.accent}><strong>Private Google Access:</strong> Allows VMs without public IPs to reach Google APIs/services. Enable per-subnet.</Li>
            <Li accent={COLORS.accent}><strong>Cloud NAT:</strong> Allows private VMs to initiate outbound internet connections without external IPs. No inbound allowed.</Li>
          </ul>
        </Card>

        <Card title="Cloud DNS & Traffic Management" accent={COLORS.green}>
          <ul style={{ margin: 0, padding: 0 }}>
            <Li accent={COLORS.green}><strong>Cloud DNS:</strong> Managed authoritative DNS. Use private zones for internal resolution within VPCs.</Li>
            <Li accent={COLORS.green}><strong>Traffic Director:</strong> Managed service mesh control plane for GKE and GCE. Provides global load balancing, traffic splitting, circuit breaking.</Li>
            <Li accent={COLORS.green}><strong>Cloud Armor:</strong> DDoS protection + WAF. Attach to Global HTTPS LB. Use adaptive protection for automatic DDoS detection.</Li>
            <Li accent={COLORS.green}><strong>Private Service Connect:</strong> Access Google services or third-party services via private IP without VPC peering or internet.</Li>
          </ul>
        </Card>
      </div>

      <Card title="Network Security Layers" accent={COLORS.red} tag="EXAM TOPIC">
        <ul style={{ margin: 0, padding: 0 }}>
          <Li accent={COLORS.red}><strong>Firewall Rules:</strong> Stateful, applied to VMs via network tags or service accounts. Use service account-based rules for zero-trust network security.</Li>
          <Li accent={COLORS.red}><strong>Firewall Policies (Hierarchical):</strong> Apply at Org/Folder level. Enforced before VPC firewall rules. Use for organization-wide baseline security.</Li>
          <Li accent={COLORS.red}><strong>VPC Service Controls:</strong> Security perimeters around GCP resources. Prevents data exfiltration. Restricts API access to within the perimeter. Critical for regulated industries.</Li>
          <Li accent={COLORS.red}><strong>Cloud IDS:</strong> Intrusion Detection System based on Palo Alto Networks threat intelligence. Monitors for malware, spyware, C2 traffic.</Li>
        </ul>
      </Card>

      <QuestionBox
        question="A company needs private connectivity between their on-premises data center (Atlanta) and GCP (us-east4) with 99.99% uptime SLA and 5 Gbps bandwidth. What should they implement?"
        answer="Cloud Interconnect (Dedicated or Partner) with two redundant circuits for 99.99% SLA, NOT HA VPN (max 3Gbps and internet-based). If they have colo presence near a Google Meet Me location, use Dedicated Interconnect. Otherwise, use Partner Interconnect with a service provider. Configure two interconnect attachments across two edge availability domains."
      />
    </div>
  );
}

function Security() {
  return (
    <div>
      <SectionHeader icon="🔐" title="Security & IAM" subtitle="Least privilege, defense-in-depth, and compliance — 20% of the exam" />

      <DecisionMatrix title="IAM Role Selection Matrix" rows={[
        ["Role Type", "Scope", "When to Use", "Example"],
        ["Basic Roles (Owner/Editor/Viewer)", "Project-wide", "NEVER in production. Dev/test only.", "roles/owner — avoid completely"],
        ["Predefined Roles", "Service-specific", "Most common choice. Aligned to job function.", "roles/storage.objectViewer, roles/bigquery.dataEditor"],
        ["Custom Roles", "You define", "When predefined roles are too broad. Least-privilege scenarios.", "Custom role with only storage.objects.get + storage.objects.list"],
        ["Service Account Roles", "SA identity", "For workload identity. Attach SA to VMs/Cloud Run/GKE.", "Workload gets a SA with only needed permissions"],
      ]} />

      <Callout type="tip">
        <strong>Exam Pattern:</strong> When a question asks how to grant minimal permissions — always choose a custom role or the most specific predefined role. Never choose Editor or Owner. If a VM needs to write to GCS, grant <code>roles/storage.objectCreator</code> to the VM's Service Account, not broad storage permissions.
      </Callout>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        <Card title="Encryption Key Management" accent={COLORS.yellow} tag="HIGH FREQUENCY">
          <ul style={{ margin: 0, padding: 0 }}>
            <Li accent={COLORS.yellow}><strong>Google-managed keys (GMEK):</strong> Default. Google rotates automatically. No customer control.</Li>
            <Li accent={COLORS.yellow}><strong>Customer-managed keys (CMEK):</strong> Keys in Cloud KMS. Customer controls rotation. Required for many compliance frameworks (HIPAA, PCI).</Li>
            <Li accent={COLORS.yellow}><strong>Customer-supplied keys (CSEK):</strong> Customer provides key material on each API call. Google never stores it. Highest control, most complex.</Li>
            <Li accent={COLORS.yellow}><strong>Cloud HSM:</strong> Hardware-backed key storage in Cloud KMS. FIPS 140-2 Level 3. Required for government/financial compliance.</Li>
            <Li accent={COLORS.yellow}><strong>Confidential Computing:</strong> Encrypt data IN USE with Confidential VMs (AMD SEV). Protects against hypervisor-level attacks.</Li>
          </ul>
        </Card>

        <Card title="Identity & Access Patterns" accent={COLORS.teal}>
          <ul style={{ margin: 0, padding: 0 }}>
            <Li accent={COLORS.teal}><strong>Workload Identity Federation:</strong> Allow external workloads (AWS, GitHub Actions, on-prem) to impersonate GCP Service Accounts without service account keys.</Li>
            <Li accent={COLORS.teal}><strong>Workforce Identity Federation:</strong> Use existing IdP (Okta, Azure AD) to authenticate human users to GCP without Google accounts.</Li>
            <Li accent={COLORS.teal}><strong>Service Account Keys:</strong> AVOID. Instead use Workload Identity or metadata server. Keys are a security liability.</Li>
            <Li accent={COLORS.teal}><strong>IAM Conditions:</strong> Conditional access based on resource attributes (time, IP, resource tags). Enables just-in-time access.</Li>
          </ul>
        </Card>
      </div>

      <Card title="Security Operations & Compliance Tools" accent={COLORS.red}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[
            { name: "Security Command Center", desc: "Centralized security posture management. Detects misconfigurations, vulnerabilities, threats across all GCP resources." },
            { name: "Cloud Audit Logs", desc: "Admin Activity (always on), Data Access (enable for sensitive data), System Event, Policy Denied logs. Store in Cloud Logging or export to GCS/BigQuery." },
            { name: "VPC Service Controls", desc: "Creates security perimeters. Prevents data from leaving the perimeter even via API calls. Critical for HIPAA/PCI multi-tenant environments." },
            { name: "Binary Authorization", desc: "Only deploy container images that are cryptographically signed by trusted authorities. Enforces supply chain security in GKE." },
            { name: "Secret Manager", desc: "Store API keys, passwords, certificates. Version-controlled, audit-logged, IAM-controlled. Never hardcode secrets in code or environment variables." },
            { name: "Cloud DLP (Sensitive Data Protection)", desc: "Discover, classify, and de-identify sensitive data (PII, PHI, PCI) in GCS, BigQuery, Datastore automatically." },
          ].map(t => (
            <div key={t.name} style={{ background: COLORS.surface, borderRadius: 6, padding: 12, border: `1px solid ${COLORS.border}` }}>
              <div style={{ color: COLORS.bright, fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{t.name}</div>
              <div style={{ color: COLORS.muted, fontSize: 12, lineHeight: 1.5 }}>{t.desc}</div>
            </div>
          ))}
        </div>
      </Card>

      <QuestionBox
        question="A regulated financial company must ensure that even GCP employees cannot access their encrypted data. Encryption keys must meet FIPS 140-2 Level 3 requirements. What solution meets these requirements?"
        answer="CMEK (Customer-Managed Encryption Keys) with Cloud HSM (Hardware Security Module). Cloud HSM provides FIPS 140-2 Level 3 validated hardware key protection. The customer controls the root key, and even Google engineers cannot decrypt the data. For even stricter control, CSEK could be used but adds operational complexity."
      />
    </div>
  );
}

function AIML() {
  return (
    <div>
      <SectionHeader icon="🧠" title="AI/ML & Vertex AI" subtitle="Rapidly growing exam domain — GenAI, Vertex AI Platform, and MLOps" />

      <DecisionMatrix title="Vertex AI Service Selection" rows={[
        ["Service", "Use Case", "Key Feature"],
        ["Vertex AI Workbench", "Interactive ML notebook development, EDA, model prototyping", "Managed JupyterLab, pre-installed ML frameworks, GPU support"],
        ["Vertex AI Training", "Custom model training at scale (TF, PyTorch, XGBoost, scikit-learn)", "Distributed training, custom containers, hyperparameter tuning"],
        ["Vertex AI Prediction", "Deploy models as REST endpoints for real-time or batch predictions", "Auto-scaling, traffic splitting, monitoring, Model Garden models"],
        ["AutoML", "Train ML models without writing training code (Vision, NLP, Tabular, Video)", "No-code/low-code, Google's model architecture, best for non-ML teams"],
        ["Vertex AI Pipelines", "Orchestrate end-to-end ML workflows (data prep → train → evaluate → deploy)", "KFP or TFX based, reproducible, scheduled pipeline runs"],
        ["Model Registry", "Centralized model versioning, lineage, and lifecycle management", "Model metadata, compare versions, champion/challenger"],
        ["Feature Store", "Centralized feature repository for training and serving consistency", "Eliminates training-serving skew, feature sharing across teams"],
        ["Vertex AI Search", "Enterprise search / RAG on custom data (docs, websites, databases)", "Grounded search with citations, integrates with Gemini"],
        ["Gemini API on Vertex", "Access Gemini models with enterprise controls (VPC-SC, CMEK, audit logs)", "Foundation model API, multimodal, function calling"],
        ["Model Garden", "Browse, test, deploy 150+ foundation models (Gemma, Llama, Stable Diffusion)", "One-click deploy to Vertex endpoints, fine-tuning support"],
      ]} />

      <Card title="GenAI & RAG Architecture Pattern" accent={COLORS.purple} tag="EMERGING TOPIC">
        <Callout type="info">
          Retrieval Augmented Generation (RAG) is a key pattern in new exam questions. Know this architecture cold.
        </Callout>
        <ul style={{ margin: 0, padding: 0 }}>
          <Li accent={COLORS.purple}><strong>Step 1 — Ingest:</strong> Documents → Cloud Storage → Document AI (for PDF/OCR extraction) → chunk text.</Li>
          <Li accent={COLORS.purple}><strong>Step 2 — Embed:</strong> Text chunks → Vertex AI Embedding API → vector embeddings.</Li>
          <Li accent={COLORS.purple}><strong>Step 3 — Store:</strong> Embeddings → Vertex AI Vector Search (managed ANN index) OR AlloyDB pgvector OR BigQuery vector search.</Li>
          <Li accent={COLORS.purple}><strong>Step 4 — Query:</strong> User query → embed → vector similarity search → retrieve top-K chunks.</Li>
          <Li accent={COLORS.purple}><strong>Step 5 — Generate:</strong> Retrieved context + user query → Gemini API → grounded answer.</Li>
          <Li accent={COLORS.purple}><strong>Orchestration:</strong> Use Vertex AI Agent Builder or LangChain/LlamaIndex on Cloud Run or GKE.</Li>
        </ul>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        <Card title="MLOps & Model Monitoring" accent={COLORS.green} tag="OPERATIONS">
          <ul style={{ margin: 0, padding: 0 }}>
            <Li accent={COLORS.green}><strong>Vertex AI Model Monitoring:</strong> Detect training-serving skew and prediction drift automatically. Alerts when feature distributions shift.</Li>
            <Li accent={COLORS.green}><strong>Explainable AI:</strong> Feature attributions (SHAP, XRAI, IG) for model predictions. Required for regulated industries (HIPAA, finance).</Li>
            <Li accent={COLORS.green}><strong>A/B Testing:</strong> Traffic splitting on Vertex Prediction endpoints. Send 10% traffic to challenger model, 90% to champion.</Li>
            <Li accent={COLORS.green}><strong>Continuous Training:</strong> Trigger Vertex Pipelines from Cloud Scheduler or Pub/Sub when new data arrives or drift is detected.</Li>
          </ul>
        </Card>

        <Card title="Data Pipelines for ML" accent={COLORS.accent}>
          <ul style={{ margin: 0, padding: 0 }}>
            <Li accent={COLORS.accent}><strong>Dataflow:</strong> Managed Apache Beam for batch + streaming ETL/ELT. Best for complex transformations, exactly-once processing.</Li>
            <Li accent={COLORS.accent}><strong>Dataproc:</strong> Managed Spark/Hadoop. Use for existing Spark jobs, large-scale data processing, migration from on-prem Hadoop.</Li>
            <Li accent={COLORS.accent}><strong>Pub/Sub:</strong> Managed message queue. Ingest streaming events (IoT, clickstreams) → Dataflow → BigQuery/Bigtable.</Li>
            <Li accent={COLORS.accent}><strong>Cloud Composer:</strong> Managed Apache Airflow. Orchestrate complex multi-step data pipelines across GCP services.</Li>
          </ul>
        </Card>
      </div>

      <QuestionBox
        question="A retail company wants to build a product recommendation system that updates recommendations in real-time as users browse. What Vertex AI components should they use?"
        answer="Vertex AI Feature Store (for consistent feature serving with low latency), Vertex AI Prediction endpoint (for real-time inference), Pub/Sub + Dataflow (for streaming user event ingestion), and BigQuery (for batch feature computation). The Feature Store eliminates training-serving skew by ensuring the same features used in training are served at inference time with sub-10ms latency."
      />
    </div>
  );
}

function Operations() {
  return (
    <div>
      <SectionHeader icon="📊" title="Operations & SRE" subtitle="Cloud Monitoring, Logging, reliability, and cost management" />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        <Card title="Cloud Operations Suite" accent={COLORS.accent} tag="MONITORING">
          <ul style={{ margin: 0, padding: 0 }}>
            <Li accent={COLORS.accent}><strong>Cloud Monitoring:</strong> Metrics, dashboards, alerting. Create custom metrics from application code. Use Metric Descriptors for custom business KPIs.</Li>
            <Li accent={COLORS.accent}><strong>Cloud Logging:</strong> Centralized log management. Export via Log Sinks to GCS (cheap long-term), BigQuery (analytics), Pub/Sub (real-time processing).</Li>
            <Li accent={COLORS.accent}><strong>Cloud Trace:</strong> Distributed request tracing. Identify latency bottlenecks across microservices. Auto-integrated with Cloud Run, GKE, App Engine.</Li>
            <Li accent={COLORS.accent}><strong>Cloud Profiler:</strong> Continuous CPU and heap profiling. Zero-overhead in production. Finds performance bottlenecks in running code.</Li>
            <Li accent={COLORS.accent}><strong>Error Reporting:</strong> Automatic error detection and grouping from Cloud Logging. Real-time alerts on new error patterns.</Li>
          </ul>
        </Card>

        <Card title="SRE Concepts for the Exam" accent={COLORS.yellow} tag="RELIABILITY">
          <ul style={{ margin: 0, padding: 0 }}>
            <Li accent={COLORS.yellow}><strong>SLI (Service Level Indicator):</strong> What you measure. e.g., % of requests completed in &lt;200ms.</Li>
            <Li accent={COLORS.yellow}><strong>SLO (Service Level Objective):</strong> Target for SLI. e.g., 99.9% of requests &lt;200ms per 30-day window.</Li>
            <Li accent={COLORS.yellow}><strong>SLA (Service Level Agreement):</strong> Contractual commitment. Usually looser than internal SLO.</Li>
            <Li accent={COLORS.yellow}><strong>Error Budget:</strong> 100% - SLO%. If SLO = 99.9%, error budget = 0.1% (~43.8 min/month). Use budget for deployments, experiments.</Li>
            <Li accent={COLORS.yellow}><strong>Toil:</strong> Manual, repetitive operational work. Automate toil with Cloud Functions, Cloud Scheduler, or Workflows.</Li>
          </ul>
        </Card>
      </div>

      <DecisionMatrix title="Disaster Recovery Strategies" rows={[
        ["Pattern", "RTO", "RPO", "Cost", "Architecture"],
        ["Backup & Restore", "Hours", "Hours/Days", "Lowest", "Scheduled backups to GCS. Manual restore process. Use for non-critical systems."],
        ["Pilot Light", "30-60 min", "Minutes", "Low-Medium", "Core services always running (DB replica). Scale up app tier during disaster."],
        ["Warm Standby", "Minutes", "Seconds", "Medium-High", "Scaled-down but fully functional copy in secondary region. Fast promotion."],
        ["Hot Standby / Active-Active", "Near-zero", "Near-zero", "Highest (2x cost)", "Full capacity in multiple regions simultaneously. Global LB distributes traffic."],
      ]} />

      <Card title="Cost Optimization Strategies" accent={COLORS.green} tag="COST">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[
            { name: "Committed Use Discounts (CUDs)", desc: "1 or 3-year commitment for GCE, GKE, CloudSQL. Up to 57% savings vs on-demand. Use for predictable baseline workloads." },
            { name: "Sustained Use Discounts (SUDs)", desc: "Automatic discount for GCE VMs running >25% of month. Up to 30% discount. No commitment required." },
            { name: "Spot VMs", desc: "Up to 91% savings. For fault-tolerant batch/ML workloads only. Risk of preemption with 30s notice." },
            { name: "Budget Alerts & Quotas", desc: "Set budgets with email/Pub/Sub alerts at 50%/75%/90% of spend. Use quota limits to prevent runaway spending." },
            { name: "Recommender", desc: "AI-powered recommendations for idle VM rightsizing, unused IPs, unattached disks. Actionable insights in Console." },
            { name: "BigQuery Slot Commitments", desc: "Flat-rate pricing for predictable heavy BQ usage. Use on-demand for sporadic queries, flex slots for burst." },
          ].map(t => (
            <div key={t.name} style={{ background: COLORS.surface, borderRadius: 6, padding: 12, border: `1px solid ${COLORS.border}` }}>
              <div style={{ color: COLORS.bright, fontWeight: 700, fontSize: 12, marginBottom: 4 }}>{t.name}</div>
              <div style={{ color: COLORS.muted, fontSize: 12, lineHeight: 1.5 }}>{t.desc}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function CaseStudyCymbal() {
  return (
    <div>
      <SectionHeader icon="🛍️" title="Cymbal Retail" subtitle="Case Study Deep Dive — Retail modernization, GenAI integration, hybrid architecture" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 24 }}>
        <Card title="Business Context" accent={COLORS.accent}>
          <ul style={{ margin: 0, padding: 0 }}>
            <Li>Large global retailer with 100+ physical stores and a growing e-commerce platform</Li>
            <Li>Experiencing seasonal traffic spikes (Black Friday, holiday) that strain on-prem infrastructure</Li>
            <Li>Legacy monolith POS system, separate e-commerce platform, disconnected inventory management</Li>
            <Li>Wants to integrate GenAI for personalized recommendations and customer service chatbot</Li>
            <Li>Data analytics team uses complex BI reports that take hours on current systems</Li>
          </ul>
        </Card>
        <Card title="Technical Challenges" accent={COLORS.red}>
          <ul style={{ margin: 0, padding: 0 }}>
            <Li>On-prem systems can't handle 10x traffic spikes elastically</Li>
            <Li>Inventory data siloed across multiple systems — no single source of truth</Li>
            <Li>PCI-DSS compliance for payment data processing</Li>
            <Li>Legacy Oracle database powering core inventory — cannot be replaced immediately</Li>
            <Li>Real-time inventory visibility across stores and online needed</Li>
            <Li>Current analytics pipelines are batch-only, T+1 day delay in insights</Li>
          </ul>
        </Card>
      </div>

      <Card title="Recommended GCP Architecture" accent={COLORS.green} tag="SOLUTION">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          {[
            { layer: "E-Commerce Frontend", services: "Cloud Run (microservices), Global HTTP(S) LB, Cloud CDN, Cloud Armor (WAF/DDoS)", icon: "🌐" },
            { layer: "API Gateway", services: "Apigee API Management (rate limiting, auth, analytics for external APIs)", icon: "🔌" },
            { layer: "Inventory System", services: "Cloud Spanner (globally consistent inventory), Datastream (CDC from Oracle → Spanner)", icon: "📦" },
            { layer: "Payment Processing", services: "Cloud SQL (PCI zone), VPC Service Controls, CMEK, Cloud HSM", icon: "💳" },
            { layer: "Analytics", services: "BigQuery (DWH), Dataflow (streaming ETL), Looker (BI), BigQuery ML (demand forecasting)", icon: "📊" },
            { layer: "GenAI Layer", services: "Vertex AI Agent Builder (product search), Gemini API (chatbot), Vertex AI Search (RAG on catalog)", icon: "🧠" },
            { layer: "Hybrid Connectivity", services: "Cloud Interconnect (store POS), HA VPN (backup connectivity)", icon: "🔗" },
            { layer: "Operations", services: "Cloud Monitoring, SCC Premium, Cloud Armor, VPC-SC for PCI scope", icon: "🛡️" },
          ].map(item => (
            <div key={item.layer} style={{ background: COLORS.surface, borderRadius: 6, padding: 12, border: `1px solid ${COLORS.border}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ color: COLORS.bright, fontWeight: 700, fontSize: 12, marginBottom: 4 }}>{item.layer}</div>
              <div style={{ color: COLORS.muted, fontSize: 11, lineHeight: 1.5 }}>{item.services}</div>
            </div>
          ))}
        </div>
      </Card>

      <Callout type="tip">
        <strong>Key Architectural Pattern:</strong> Datastream for CDC migration from Oracle → Cloud Spanner is the Cymbal answer for real-time inventory sync without replacing the legacy system immediately. Spanner handles global inventory consistency during peak shopping events.
      </Callout>

      <Card title="Cymbal Exam Questions" accent={COLORS.purple} tag="PRACTICE">
        <QuestionBox
          question="Cymbal needs real-time inventory sync from their on-prem Oracle database to GCP without a big-bang migration. What service enables this?"
          answer="Datastream — a serverless CDC (Change Data Capture) service that replicates changes from Oracle in near-real-time to Cloud Spanner or BigQuery. This allows gradual migration while keeping on-prem Oracle as the system of record temporarily."
        />
        <QuestionBox
          question="Cymbal's payment processing must be PCI-DSS compliant and isolated from other workloads. What GCP controls should be applied?"
          answer="VPC Service Controls to create a security perimeter around payment services, CMEK with Cloud HSM for encryption, dedicated Cloud SQL instance in a separate project, Cloud Armor for WAF, VPC firewall rules restricting access to only payment microservices, and enabling PCI DSS compliance reports in Security Command Center Premium."
        />
        <QuestionBox
          question="Cymbal wants to add AI-powered product search that understands natural language queries like 'red dresses for a summer wedding.' What is the recommended approach?"
          answer="Vertex AI Search (Agent Builder) with their product catalog ingested as a data store. This provides semantic/natural language search with Gemini-powered understanding out of the box. For custom ranking and personalization, integrate Vertex AI Recommendations with user behavior data from Bigtable."
        />
      </Card>
    </div>
  );
}

function CaseStudyAlto() {
  return (
    <div>
      <SectionHeader icon="🎬" title="Altostrat Media" subtitle="Case Study Deep Dive — Media processing, streaming, content delivery at global scale" />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 24 }}>
        <Card title="Business Context" accent={COLORS.accent}>
          <ul style={{ margin: 0, padding: 0 }}>
            <Li>Global media and entertainment company with 500M+ subscribers</Li>
            <Li>Manages and distributes video content (movies, TV shows, live events)</Li>
            <Li>Massive content library: 50PB+ of raw video assets</Li>
            <Li>Needs to transcode content to 20+ formats/resolutions for different devices</Li>
            <Li>Live streaming events require sub-5 second latency globally</Li>
            <Li>Wants AI-powered content discovery and automatic subtitle generation</Li>
          </ul>
        </Card>
        <Card title="Technical Challenges" accent={COLORS.red}>
          <ul style={{ margin: 0, padding: 0 }}>
            <Li>Video transcoding is extremely compute-intensive and bursty</Li>
            <Li>Content delivery must handle 10M concurrent viewers during live events</Li>
            <Li>Metadata indexing at scale (50M+ content items)</Li>
            <Li>Copyright protection and DRM enforcement</Li>
            <Li>Analytics on viewer behavior for content recommendations</Li>
            <Li>Multi-region content distribution with data residency requirements (GDPR)</Li>
          </ul>
        </Card>
      </div>

      <Card title="Recommended GCP Architecture" accent={COLORS.green} tag="SOLUTION">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          {[
            { layer: "Content Ingest", services: "Cloud Storage (multi-region bucket), Transfer Appliance (bulk migration), Pub/Sub (ingest events)", icon: "📥" },
            { layer: "Transcoding", services: "Transcoder API (managed), GKE Autopilot + Spot VMs (custom FFmpeg jobs), Cloud Tasks (job queue)", icon: "🎞️" },
            { layer: "Content Delivery", services: "Media CDN (YouTube-scale CDN), Global HTTPS LB, Cloud CDN for VOD, low-latency Live Stream API", icon: "🌍" },
            { layer: "Metadata & Search", services: "Firestore (content metadata), Vertex AI Search (semantic content discovery), Elasticsearch on GKE", icon: "🔍" },
            { layer: "AI/ML", services: "Video Intelligence API (scene detection, tagging), Speech-to-Text (subtitles), Vertex AI (recommendation engine)", icon: "🧠" },
            { layer: "Analytics", services: "Pub/Sub → Dataflow → BigQuery (viewer behavior), Looker (content performance), BigQuery ML (churn prediction)", icon: "📊" },
            { layer: "Storage Strategy", services: "Cloud Storage Standard (recent content), Nearline (archive >6mo), Coldline (legacy library)", icon: "🗄️" },
            { layer: "DRM / Security", services: "Cloud KMS (DRM keys), VPC Service Controls, Cloud Armor, IAP for internal tools", icon: "🔐" },
          ].map(item => (
            <div key={item.layer} style={{ background: COLORS.surface, borderRadius: 6, padding: 12, border: `1px solid ${COLORS.border}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ color: COLORS.bright, fontWeight: 700, fontSize: 12, marginBottom: 4 }}>{item.layer}</div>
              <div style={{ color: COLORS.muted, fontSize: 11, lineHeight: 1.5 }}>{item.services}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Altostrat Exam Questions" accent={COLORS.purple} tag="PRACTICE">
        <QuestionBox
          question="Altostrat needs to transcode 10,000 videos per day at minimum cost. Transcoding jobs are fault-tolerant and take 30-90 minutes each. What is the most cost-efficient solution?"
          answer="GKE Autopilot with Spot VMs for transcoding worker nodes, using a job queue managed by Cloud Tasks or Pub/Sub. Spot VMs provide up to 91% cost savings. The jobs are checkpointed to Cloud Storage so they can resume after preemption. Use node taints to ensure transcoding pods only run on Spot nodes."
        />
        <QuestionBox
          question="Altostrat's new AI feature automatically generates subtitles for 50 languages. What Google AI services should be used in the pipeline?"
          answer="Speech-to-Text API for transcription → Translation API for multi-language subtitle generation → Video Intelligence API for scene segmentation to align subtitle timing. Store results in Firestore per video asset. For custom domain terminology (film titles, celebrity names), fine-tune the Speech-to-Text model with custom vocabulary."
        />
        <QuestionBox
          question="Altostrat needs GDPR-compliant storage for EU subscriber data. Subscriber viewing history must not leave the EU. How do you architect this?"
          answer="Multi-region EU Cloud Storage bucket for content (eur4 or eu multi-region). BigQuery dataset in EU region for analytics. Firestore in europe-west locations for user profiles. VPC Service Controls to prevent data egress outside EU perimeter. Cloud Armor geo-blocking policies. Organization policy constraints/gcp.resourceLocations to restrict resource creation to EU regions only."
        />
      </Card>
    </div>
  );
}

function CaseStudyEHR() {
  return (
    <div>
      <SectionHeader icon="🏥" title="EHR Healthcare" subtitle="Case Study Deep Dive — HIPAA compliance, healthcare data, legacy modernization" />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 24 }}>
        <Card title="Business Context" accent={COLORS.accent}>
          <ul style={{ margin: 0, padding: 0 }}>
            <Li>Leading electronic health records SaaS provider serving 5,000+ hospitals</Li>
            <Li>Hosts patient records (PHI — Protected Health Information) for 25M+ patients</Li>
            <Li>On-prem data centers approaching end of life in 18 months</Li>
            <Li>Strict HIPAA, HITRUST, SOC 2 compliance requirements</Li>
            <Li>Customers (hospitals) demand 99.99% uptime SLA for critical patient care systems</Li>
            <Li>Wants to offer AI-assisted diagnostics and clinical decision support features</Li>
          </ul>
        </Card>
        <Card title="Technical Challenges" accent={COLORS.red}>
          <ul style={{ margin: 0, padding: 0 }}>
            <Li>PHI data must be encrypted at rest and in transit, access audited completely</Li>
            <Li>Legacy .NET monolith application with tight on-prem dependencies</Li>
            <Li>HL7 FHIR API compliance required for healthcare data interoperability</Li>
            <Li>Different customers (hospitals) must have data isolation (multi-tenancy)</Li>
            <Li>Disaster recovery: RTO &lt; 1hr, RPO &lt; 15min for patient-critical systems</Li>
            <Li>Clinical ML models must be explainable (regulatory requirement)</Li>
          </ul>
        </Card>
      </div>

      <Card title="Recommended GCP Architecture" accent={COLORS.green} tag="SOLUTION">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          {[
            { layer: "HIPAA Foundation", services: "VPC Service Controls, CMEK (Cloud HSM), Cloud Audit Logs (all logs retained 7yr in GCS Coldline)", icon: "🔐" },
            { layer: "Healthcare Data Store", services: "Cloud Healthcare API (FHIR R4, HL7v2, DICOM native), Cloud SQL (HIPAA-eligible) for structured EHR data", icon: "🏥" },
            { layer: "Multi-tenant Isolation", services: "Separate GCP Projects per customer tier, Shared VPC, VPC-SC perimeters, project-level CMEK keys", icon: "🏗️" },
            { layer: "App Modernization", services: "GKE Autopilot (containerized .NET app), Anthos (hybrid during migration), App Engine (new microservices)", icon: "⚙️" },
            { layer: "Analytics & AI", services: "BigQuery + Healthcare Data Engine (FHIR analytics), Vertex AI (clinical ML, AutoML for medical imaging)", icon: "🧠" },
            { layer: "High Availability", services: "Cloud SQL read replicas + failover (regional HA), GKE multi-zonal clusters, Global LB, Cloud Spanner for critical scheduling", icon: "🛡️" },
            { layer: "Identity & Access", services: "Cloud Identity, Workforce Identity Federation (hospital AD integration), IAM Conditions (time-based access)", icon: "👤" },
            { layer: "Disaster Recovery", services: "Active-active multi-region for critical services, Cloud SQL cross-region replica (RPO ~15min), GCVE for legacy VM DR", icon: "🔄" },
          ].map(item => (
            <div key={item.layer} style={{ background: COLORS.surface, borderRadius: 6, padding: 12, border: `1px solid ${COLORS.border}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ color: COLORS.bright, fontWeight: 700, fontSize: 12, marginBottom: 4 }}>{item.layer}</div>
              <div style={{ color: COLORS.muted, fontSize: 11, lineHeight: 1.5 }}>{item.services}</div>
            </div>
          ))}
        </div>
      </Card>

      <Callout type="danger">
        <strong>HIPAA-Critical Pattern:</strong> The <strong>Cloud Healthcare API</strong> is the exam answer for storing FHIR/HL7/DICOM healthcare data natively. It's HIPAA-eligible, supports de-identification, and integrates directly with BigQuery for analytics via Healthcare Data Engine. Do NOT store PHI in regular Cloud Storage without proper controls.
      </Callout>

      <Card title="EHR Healthcare Exam Questions" accent={COLORS.purple} tag="PRACTICE">
        <QuestionBox
          question="EHR needs to allow hospital IT administrators to access patient records using their existing Active Directory credentials without creating Google accounts. How?"
          answer="Workforce Identity Federation with their Active Directory (via SAML 2.0 or OIDC). This allows hospital AD users to authenticate to GCP using existing credentials. Map AD groups to IAM roles (e.g., AD 'EHR-Admins' group → roles/viewer on specific projects). No Google accounts or service account keys required."
        />
        <QuestionBox
          question="EHR's clinical ML model predicts patient readmission risk. Regulators require each prediction to be explainable. What Vertex AI feature addresses this?"
          answer="Vertex AI Explainable AI with feature attributions. Configure the model with SHAP (Shapley values) or Integrated Gradients attribution methods. Each prediction returns feature importance scores showing which patient factors (age, diagnosis codes, medication history) contributed most to the readmission risk score. This satisfies healthcare regulatory explainability requirements."
        />
        <QuestionBox
          question="A hospital customer requires that their patient data never co-mingles with other hospital data, even in shared infrastructure. How does EHR implement this on GCP?"
          answer="Project-level isolation: each hospital customer gets a dedicated GCP project with their own VPC, Cloud SQL instance, and CMEK key (unique per customer). VPC Service Controls creates a security perimeter per hospital project. Shared VPC for common networking controlled by EHR. Org policies restrict resource creation to approved regions. This provides cryptographic and logical data isolation."
        />
      </Card>
    </div>
  );
}

function CaseStudyKnight() {
  return (
    <div>
      <SectionHeader icon="🚗" title="KnightMotives Automotive" subtitle="Case Study Deep Dive — Connected vehicles, IoT, real-time telemetry, autonomous driving data" />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 24 }}>
        <Card title="Business Context" accent={COLORS.accent}>
          <ul style={{ margin: 0, padding: 0 }}>
            <Li>Automotive OEM manufacturing connected and autonomous vehicles</Li>
            <Li>Fleet of 2M+ connected vehicles generating telemetry continuously</Li>
            <Li>Real-time fleet monitoring, predictive maintenance, over-the-air (OTA) updates</Li>
            <Li>Autonomous vehicle development requires processing petabytes of sensor data (LiDAR, camera, radar)</Li>
            <Li>Wants to build a marketplace for third-party automotive apps using vehicle APIs</Li>
            <Li>Manufacturing plants need private connectivity to GCP for operational data</Li>
          </ul>
        </Card>
        <Card title="Technical Challenges" accent={COLORS.red}>
          <ul style={{ margin: 0, padding: 0 }}>
            <Li>2M vehicles × 1,000 telemetry points/second = massive Pub/Sub ingestion requirements</Li>
            <Li>Latency requirements: safety alerts must be processed in &lt;100ms end-to-end</Li>
            <Li>Autonomous vehicle sensor data: 40GB/vehicle/hour for LiDAR + cameras</Li>
            <Li>Functional safety (ISO 26262) compliance for safety-critical systems</Li>
            <Li>ML models for predictive maintenance must be updated to vehicles (edge deployment)</Li>
            <Li>Third-party developer access to vehicle APIs requires governance and monetization</Li>
          </ul>
        </Card>
      </div>

      <Card title="Recommended GCP Architecture" accent={COLORS.green} tag="SOLUTION">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          {[
            { layer: "Vehicle Connectivity", services: "Cloud IoT Core (deprecated → use Pub/Sub direct with mTLS), Cloud Endpoints for vehicle API authentication", icon: "📡" },
            { layer: "Telemetry Ingestion", services: "Pub/Sub (high-throughput ingest, 2M vehicles), Dataflow (stream processing, anomaly detection), Bigtable (time-series storage)", icon: "📊" },
            { layer: "Real-time Alerts", services: "Pub/Sub + Dataflow (CEP for safety alerts), Cloud Functions (trigger notifications), Pub/Sub push to vehicle endpoints", icon: "🚨" },
            { layer: "Sensor Data Storage", services: "Cloud Storage (multi-regional, raw LiDAR/video), Avro/Parquet format, lifecycle → Nearline/Coldline after processing", icon: "🗄️" },
            { layer: "AV ML Training", services: "Vertex AI Training (distributed TF/PyTorch), TPU v4 pods (LiDAR model training), Vertex Pipelines (MLOps), Vertex Model Registry", icon: "🧠" },
            { layer: "Predictive Maintenance", services: "Bigtable (vehicle telemetry features), Vertex AI Prediction (real-time inference), BigQuery ML (fleet-wide patterns)", icon: "🔧" },
            { layer: "OTA Updates", services: "Cloud Storage (firmware artifacts), Pub/Sub (update commands to vehicles), Cloud Functions (staged rollout logic)", icon: "📲" },
            { layer: "Developer Marketplace", services: "Apigee (API gateway, monetization, rate-limiting, analytics), Cloud Endpoints, API keys management", icon: "🏪" },
            { layer: "Manufacturing Connectivity", services: "Cloud Interconnect (Dedicated, plant sites), Anthos (on-prem K8s for plant edge), Anthos Config Mgmt", icon: "🏭" },
          ].map(item => (
            <div key={item.layer} style={{ background: COLORS.surface, borderRadius: 6, padding: 12, border: `1px solid ${COLORS.border}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ color: COLORS.bright, fontWeight: 700, fontSize: 12, marginBottom: 4 }}>{item.layer}</div>
              <div style={{ color: COLORS.muted, fontSize: 11, lineHeight: 1.5 }}>{item.services}</div>
            </div>
          ))}
        </div>
      </Card>

      <Callout type="warn">
        <strong>Key Pattern — Bigtable for IoT Telemetry:</strong> Bigtable is the definitive answer for vehicle telemetry time-series. Design the row key as <code>[vehicle_id]#[reversed_timestamp]</code> to achieve even distribution and efficient time-range scans. Never use sequential timestamps as the only row key component (hot-spotting on a single tablet server).
      </Callout>

      <Card title="KnightMotives Exam Questions" accent={COLORS.purple} tag="PRACTICE">
        <QuestionBox
          question="KnightMotives needs to process 2 billion telemetry messages per day from vehicles with complex event processing to detect dangerous driving patterns. What streaming architecture handles this?"
          answer="Pub/Sub as the ingest layer (scales horizontally, guaranteed delivery), Dataflow with Apache Beam windowing functions for complex event processing (detect patterns across 30-second sliding windows), results written to Bigtable for real-time query and BigQuery for fleet analytics. Use Dataflow Flex Templates for portable, reproducible pipeline deployments."
        />
        <QuestionBox
          question="KnightMotives wants third-party developers to build apps using their vehicle API, with usage-based billing and rate limiting. What GCP service is best?"
          answer="Apigee API Management. Apigee provides: API monetization (usage-based billing plans), rate limiting (quota policies per API key), analytics dashboard for developers, API key management, OAuth 2.0 authentication, and a developer portal for documentation. This is the GCP-native solution for API product management and marketplace scenarios."
        />
        <QuestionBox
          question="KnightMotives wants to deploy ML predictive maintenance models to vehicles for local inference without cloud connectivity. What edge ML approach should they use?"
          answer="Vertex AI Edge — export trained models to TensorFlow Lite or ONNX format for edge deployment. Use Vertex AI Model Registry for versioning. OTA updates to vehicles via Cloud Storage + Pub/Sub command channel. For manufacturing plant edge servers, use Anthos with Vertex AI inference containers running on-prem. This enables inference even when vehicles are offline."
        />
      </Card>
    </div>
  );
}

function Framework() {
  return (
    <div>
      <SectionHeader icon="🏛️" title="Google Cloud Architecture Framework" subtitle="Mapping all solutions back to the 5 pillars — how every exam answer connects to a framework principle" />

      {[
        {
          pillar: "Operational Excellence",
          color: COLORS.accent,
          icon: "⚙️",
          principles: [
            { name: "Infrastructure as Code", detail: "Always use Terraform or Deployment Manager. Never manual console changes in production. Cloud Build for IaC pipelines. Config Connector for K8s-native GCP resource management." },
            { name: "CI/CD Pipelines", detail: "Cloud Build (GCP-native) or Jenkins/GitLab on GKE. Artifact Registry for container images and packages. Binary Authorization to enforce signed images." },
            { name: "Observability Triangle", detail: "Metrics (Cloud Monitoring) + Logs (Cloud Logging) + Traces (Cloud Trace) + Profiles (Cloud Profiler). All four together = full observability." },
            { name: "Automation over Toil", detail: "Cloud Scheduler for cron jobs, Cloud Workflows for orchestration, Cloud Functions for event-driven automation. Reduce manual operational toil." },
          ]
        },
        {
          pillar: "Security & Compliance",
          color: COLORS.red,
          icon: "🔐",
          principles: [
            { name: "Defense in Depth", detail: "Multiple security layers: Cloud Armor (edge) → VPC Firewall → VPC-SC (service perimeter) → IAM (identity) → CMEK (data). Never rely on a single control." },
            { name: "Least Privilege", detail: "Granular predefined roles or custom roles. Service accounts with minimal permissions. Workload Identity instead of service account keys. Regular IAM review with Policy Analyzer." },
            { name: "Zero Trust", detail: "BeyondCorp Enterprise for application access without VPN. IAP (Identity-Aware Proxy) for internal apps. Service account-based firewall rules (not IP-based)." },
            { name: "Data Classification", detail: "Cloud DLP for PII/PHI/PCI discovery and de-identification. Data Catalog for data governance. Separate encryption keys per data classification level." },
          ]
        },
        {
          pillar: "Reliability",
          color: COLORS.green,
          icon: "🛡️",
          principles: [
            { name: "Multi-zone by Default", detail: "Always deploy across ≥2 zones. Regional MIGs, Cloud SQL HA (failover replica in different zone), GKE multi-zonal clusters. Single-zone deployments are exam wrong answers." },
            { name: "Multi-region for Critical", detail: "Spanner (global), Cloud Storage (multi-region buckets), Global LB for traffic routing. Multi-region = tolerance for full zone/region outages." },
            { name: "SLO-Driven Design", detail: "Define SLIs before building. Design architecture to meet SLOs with margin. Error budgets enable risk decisions. Use Cloud Monitoring SLO feature to track in real-time." },
            { name: "Chaos Engineering", detail: "Test failure modes proactively. GKE node draining, Cloud SQL failover tests, Pub/Sub retry policies, Dataflow pipeline restart from snapshot." },
          ]
        },
        {
          pillar: "Performance Optimization",
          color: COLORS.yellow,
          icon: "⚡",
          principles: [
            { name: "Right-sizing", detail: "GCE Recommender for VM rightsizing. GKE VPA for pod right-sizing. BigQuery slot analysis. Never over-provision; use autoscaling instead." },
            { name: "Caching Strategy", detail: "Memorystore Redis for application cache (session, frequent queries). Cloud CDN for static content. BI Engine for BigQuery dashboard acceleration. Cache-aside pattern." },
            { name: "Data Locality", detail: "Place BigQuery datasets, Cloud Storage buckets, and compute in the same region to minimize inter-region latency and egress costs." },
            { name: "Async Processing", detail: "Decouple synchronous APIs from long-running work with Pub/Sub + Cloud Tasks. Respond immediately to users; process asynchronously. Improves perceived performance." },
          ]
        },
        {
          pillar: "Cost Optimization",
          color: COLORS.teal,
          icon: "💰",
          principles: [
            { name: "Serverless First", detail: "Cloud Run, Cloud Functions, BigQuery scale to zero. No idle resource costs. Evaluate serverless before committing to always-on infrastructure." },
            { name: "Commitment Strategy", detail: "CUDs for stable baseline workloads. Spot VMs for fault-tolerant burst. Sustained Use Discounts (automatic) for steady GCE usage. Never pay full on-demand for stable workloads." },
            { name: "Storage Lifecycle", detail: "Object Lifecycle Management to auto-transition GCS objects through Standard → Nearline → Coldline → Archive based on age and access patterns." },
            { name: "FinOps Practices", detail: "Label all resources (team, environment, cost-center). Budget alerts. GCP Recommender for idle/oversized resources. Cloud Billing export to BigQuery for granular cost analysis." },
          ]
        },
      ].map(section => (
        <Card key={section.pillar} title={`${section.icon} ${section.pillar}`} accent={section.color}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {section.principles.map(p => (
              <div key={p.name} style={{ background: COLORS.surface, borderRadius: 6, padding: 12, border: `1px solid ${section.color}22` }}>
                <div style={{ color: section.color, fontWeight: 700, fontSize: 12, marginBottom: 4 }}>{p.name}</div>
                <div style={{ color: COLORS.muted, fontSize: 12, lineHeight: 1.5 }}>{p.detail}</div>
              </div>
            ))}
          </div>
        </Card>
      ))}

      <Callout type="tip">
        <strong>Exam Answering Strategy:</strong> When two answers are technically correct, always choose the one that better satisfies the <em>most</em> architecture framework pillars. A solution using Cloud Run (Operational Excellence ✓, Cost Optimization ✓) beats GCE (requires manual management ✗, pays for idle ✗) even if both would technically work.
      </Callout>

      <Card title="Final Exam Preparation Checklist" accent={COLORS.purple} tag="EXAM READY">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[
            "✅ Read all 4 case studies at least 3x — know each company's requirements by memory",
            "✅ Know the compute decision tree cold: Serverless → Containers → VMs → specialized",
            "✅ Practice DB selection: SQL vs Spanner vs Bigtable vs BigQuery vs Firestore",
            "✅ Understand hybrid connectivity: Interconnect vs HA VPN tradeoffs and SLAs",
            "✅ Know IAM least-privilege patterns — every security question tests this",
            "✅ Understand CMEK, CSEK, Cloud HSM for encryption compliance scenarios",
            "✅ Know Vertex AI product lineup: AutoML vs Custom Training vs Gemini API",
            "✅ Practice SLO/SLI/Error Budget math and multi-region HA patterns",
            "✅ Know storage classes and lifecycle management for cost optimization",
            "✅ Understand VPC Service Controls, Shared VPC, VPC Peering differences",
          ].map((item, i) => (
            <div key={i} style={{ background: COLORS.surface, borderRadius: 6, padding: "8px 12px", fontSize: 12, color: COLORS.text, lineHeight: 1.5, border: `1px solid ${COLORS.border}` }}>{item}</div>
          ))}
        </div>
      </Card>
    </div>
  );
}

const SECTION_MAP = {
  overview: Overview, compute: Compute, storage: Storage, networking: Networking,
  security: Security, aiml: AIML, operations: Operations,
  "case-cymbal": CaseStudyCymbal, "case-alto": CaseStudyAlto,
  "case-ehr": CaseStudyEHR, "case-knight": CaseStudyKnight,
  framework: Framework,
};

export default function App() {
  const [active, setActive] = useState("overview");
  const [menuOpen, setMenuOpen] = useState(false);
  const Section = SECTION_MAP[active];

  return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, fontFamily: "'Inter', -apple-system, sans-serif", color: COLORS.text }}>
      {/* Header */}
      <div style={{ background: COLORS.surface, borderBottom: `1px solid ${COLORS.border}`, padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.teal})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>☁️</div>
          <div>
            <div style={{ color: COLORS.bright, fontWeight: 800, fontSize: 15, lineHeight: 1 }}>GCP Professional Cloud Architect</div>
            <div style={{ color: COLORS.muted, fontSize: 11, marginTop: 2 }}>Comprehensive PCA Certification Study Guide</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Badge label="PCA 2024-2025" color={COLORS.accent} />
          <Badge label="12 Sections" color={COLORS.green} />
        </div>
      </div>

      <div style={{ display: "flex", maxWidth: 1300, margin: "0 auto" }}>
        {/* Sidebar */}
        <div style={{ width: 200, flexShrink: 0, position: "sticky", top: 60, height: "calc(100vh - 60px)", overflowY: "auto", padding: "16px 12px", borderRight: `1px solid ${COLORS.border}` }}>
          {NAV.map(item => (
            <button key={item.id} onClick={() => setActive(item.id)} style={{
              display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "9px 12px", borderRadius: 7, border: "none", cursor: "pointer", marginBottom: 3, textAlign: "left", fontSize: 12, fontWeight: active === item.id ? 700 : 400,
              background: active === item.id ? COLORS.accent + "22" : "transparent",
              color: active === item.id ? COLORS.accent : COLORS.muted,
              borderLeft: active === item.id ? `2px solid ${COLORS.accent}` : "2px solid transparent",
            }}>
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: "32px 32px", maxWidth: "calc(100% - 200px)", overflowX: "hidden" }}>
          <Section />
        </div>
      </div>
    </div>
  );
}
