import { ResearcherProfile } from '../types/researcher';

export const INITIAL_RESEARCHER_PROFILE: ResearcherProfile = {
  name: 'Keerthivasan P V',
  title: 'Ph.D. Research Scholar',
  roleType: 'research_scholar',
  advisor: 'Prof. David K. Miller',
  advisorUrl: 'https://scholar.google.com',
  coAdvisor: 'Prof. Elena Rostova',
  phdProgram: 'Ph.D. in Computer Science & Engineering',
  expectedGraduation: 'Expected: Spring 2027',
  researchStage: 'Ph.D. Candidate (Post-Comprehensive / Thesis Stage)',
  jobMarketStatus: 'Open to Research Internships & Postdoctoral Fellowships',
  affiliation: 'Institute for Computational Systems & Network Science',
  department: 'Department of Computer Science & Engineering',
  labName: 'Network Dynamics & Scalable Intelligence Lab',
  location: 'Cambridge, MA / Building 34, Rm 420',
  avatarUrl: '', // uses prestigious SVG monogram/portrait fallback if empty
  bio: [
    'I am a Ph.D. Research Scholar in the Department of Computer Science & Engineering at the Institute for Computational Systems & Network Science, advised by Prof. David K. Miller and co-advised by Prof. Elena Rostova.'
  ],
  researchStatement: 'Investigating how high-order topology and discrete geometry can be parameterized into neural message-passing architectures with provable expressivity beyond Weisfeiler-Lehman limits.',
  news: [
    {
      id: 'news-1',
      date: 'July 2026',
      content: 'Our paper "Provably Expressive Higher-Order Graph Transformers via Cellular Sheaf Laplacians" was accepted at ICML 2026 in Vienna!',
      tag: 'Paper',
      link: '#publications'
    },
    {
      id: 'news-2',
      date: 'May 2026',
      content: 'Awarded the ACM SIGKDD Student Travel Grant to attend KDD in Barcelona.',
      tag: 'Award',
      link: '#engagements'
    },
    {
      id: 'news-3',
      date: 'March 2026',
      content: 'Successfully defended Ph.D. Dissertation Proposal and advanced to Doctoral Candidacy.',
      tag: 'Milestone'
    },
    {
      id: 'news-4',
      date: 'Dec 2025',
      content: 'Presented our paper on Decentralized Optimization as an Oral Talk at NeurIPS in New Orleans.',
      tag: 'Talk',
      link: '#engagements'
    },
    {
      id: 'news-5',
      date: 'Sept 2025',
      content: 'Completed a 6-week visiting research fellowship at the Max Planck Institute (MPI MiS) with Prof. Jürgen Jost.',
      tag: 'Visit',
      link: '#engagements'
    }
  ],
  links: {
    googleScholar: 'https://scholar.google.com/citations?user=kvasan_scholar_sample',
    linkedin: 'https://www.linkedin.com/in/kvasan-researcher',
    orcid: 'https://orcid.org/0000-0002-8419-7231',
    orcidId: '0000-0002-8419-7231',
    cvUrl: '#academic-cv', // Anchor or custom PDF link
    github: 'https://github.com/kvasan-lab',
    researchGate: 'https://www.researchgate.net/profile/K-Vasan',
    twitter: 'https://x.com/kvasan_sci',
    email: 'kvasan1506@gmail.com'
  },
  metrics: {
    totalCitations: 540,
    hIndex: 8,
    i10Index: 8,
    publicationsCount: 8
  },
  interests: [
    {
      id: 'graph-learning',
      title: 'Scalable Graph Neural Networks & Topology',
      subtitle: 'Higher-order representations, dynamic hypergraphs, and spectral graph theory',
      description: 'Developing geometric deep learning frameworks capable of scaling to billions of nodes while maintaining provable expressive power beyond the 1-Weisfeiler-Lehman graph isomorphism test.',
      keyQuestions: [
        'How do non-local topological symmetries mitigate oversmoothing and oversquashing in deep GNNs?',
        'Can dynamic temporal graphs be modeled with sub-quadratic sample complexity under streaming constraints?'
      ],
      methodologies: ['Spectral Graph Theory', 'Riemannian Manifolds', 'Geometric Deep Learning', 'Sparse Matrix Algebra'],
      activeProjects: [
        'HyperGraphX: Higher-order dynamic hypergraph representation library',
        'Topological message-passing for molecular property prediction'
      ],
      iconName: 'Network'
    },
    {
      id: 'trustworthy-ai',
      title: 'Trustworthy & Interpretable AI for Science',
      subtitle: 'Rigorous uncertainty quantification, algorithmic auditability, and out-of-distribution robustness',
      description: 'Constructing principled calibration and uncertainty estimation methods for black-box scientific surrogates, ensuring robustness against covariate shift and adversarial perturbations.',
      keyQuestions: [
        'How can conformal prediction intervals be guaranteed on non-exchangeable structured network data?',
        'What are the fundamental limits of post-hoc attribution maps on non-Euclidean manifolds?'
      ],
      methodologies: ['Conformal Prediction', 'Bayesian Neural Surrogates', 'Adversarial Verification', 'Causal Inference'],
      activeProjects: [
        'CertiGraph: Certified robust bounds under adversarial edge insertion',
        'Conformal uncertainty bands for physical simulation surrogates'
      ],
      iconName: 'ShieldCheck'
    },
    {
      id: 'info-diffusion',
      title: 'Computational Social Science & Diffusion Dynamics',
      subtitle: 'Stochastic cascade models, polarization metrics, and algorithmic curation',
      description: 'Investigating stochastic epidemic and information spread cascades across multi-layer networks to identify critical percolation thresholds and mitigate toxic polarization.',
      keyQuestions: [
        'Which topological bottlenecks govern rapid viral cascade cascades in multiplex communications?',
        'How do algorithmic recommendation loops amplify echo-chamber formation in empirical social graphs?'
      ],
      methodologies: ['Hawkes Processes', 'Percolation Theory', 'Agent-Based Simulation', 'Statistical Physics'],
      activeProjects: [
        'Polaris: Real-time observational tracking of multiplex discourse shift',
        'Optimal seeding algorithms under bounded information attention'
      ],
      iconName: 'Share2'
    },
    {
      id: 'distributed-opt',
      title: 'Distributed Optimization & Multi-Agent Systems',
      subtitle: 'Asynchronous consensus, federated graph learning, and communication efficiency',
      description: 'Designing consensus algorithms and decentralized stochastic gradient methods for multi-agent autonomous clusters subject to packet drops and time-varying communication graphs.',
      keyQuestions: [
        'Can decentralized optimization achieve linear speedup under directed, unbalanced network topologies?',
        'How can privacy be preserved in federated graph learning without degrading global utility?'
      ],
      methodologies: ['Decentralized SGD', 'Differential Privacy', 'Non-convex Optimization', 'Game Theory'],
      activeProjects: [
        'FedTopology: Privacy-preserving collaborative graph neural networks',
        'Asynchronous push-sum consensus for low-bandwidth robotic fleets'
      ],
      iconName: 'Cpu'
    }
  ],
  publications: [
    {
      id: 'pub-2026-1',
      title: 'Provably Expressive Higher-Order Graph Transformers via Cellular Sheaf Laplacians',
      authors: ['K. Vasan', 'Elena Rostova', 'Marcus Thorne', 'A. S. Venkatesh'],
      year: 2026,
      venue: 'International Conference on Machine Learning (ICML)',
      venueType: 'conference',
      doi: '10.48550/arXiv.2603.08912',
      pdfUrl: '#',
      codeUrl: 'https://github.com/kvasan-lab/sheaf-transformers',
      slidesUrl: '#',
      abstract: 'Standard message-passing neural networks suffer from well-documented expressivity bottlenecks bounded by the 1-WL isomorphism test. We present SheafFormer, a scalable transformer architecture parameterized by discrete cellular sheaf Laplacians. We prove that SheafFormer strictly supersedes 3-WL expressivity while reducing asymptotic attention complexity from O(N^2) to O(N + |E| log N) through spectral sparsification. Empirical evaluations on molecular and biological benchmarks demonstrate state-of-the-art accuracy with 42% fewer trainable parameters.',
      citations: 18,
      highlighted: true,
      topicId: 'graph-learning',
      bibtex: `@inproceedings{vasan2026provably,
  title={Provably Expressive Higher-Order Graph Transformers via Cellular Sheaf Laplacians},
  author={Vasan, K. and Rostova, Elena and Thorne, Marcus and Venkatesh, A. S.},
  booktitle={Proceedings of the 43rd International Conference on Machine Learning (ICML)},
  year={2026},
  pages={1042--1056},
  doi={10.48550/arXiv.2603.08912}
}`
    },
    {
      id: 'pub-2025-1',
      title: 'Conformalized Distribution-Free Uncertainty Quantification over Heterogeneous Relational Networks',
      authors: ['K. Vasan', 'Sophia Lin', 'David K. Miller'],
      year: 2025,
      venue: 'IEEE Transactions on Pattern Analysis and Machine Intelligence (TPAMI)',
      venueType: 'journal',
      volume: '47',
      issue: '8',
      pages: '1420--1435',
      doi: '10.1109/TPAMI.2025.3418902',
      pdfUrl: '#',
      codeUrl: 'https://github.com/kvasan-lab/relational-conformal',
      datasetUrl: '#',
      abstract: 'Conformal prediction provides finite-sample valid prediction intervals under exchangeability. However, real-world interconnected network nodes heavily violate exchangeability due to homophily and topological autocorrelation. In this paper, we establish a theoretical bound on the coverage gap under localized graph exchangeability and formulate RelConformal, a calibration algorithm with finite-sample valid coverage guarantees on arbitrary interconnected graphs.',
      citations: 64,
      highlighted: true,
      topicId: 'trustworthy-ai',
      bibtex: `@article{vasan2025conformalized,
  title={Conformalized Distribution-Free Uncertainty Quantification over Heterogeneous Relational Networks},
  author={Vasan, K. and Lin, Sophia and Miller, David K.},
  journal={IEEE Transactions on Pattern Analysis and Machine Intelligence},
  volume={47},
  number={8},
  pages={1420--1435},
  year={2025},
  publisher={IEEE},
  doi={10.1109/TPAMI.2025.3418902}
}`
    },
    {
      id: 'pub-2025-2',
      title: 'Cascading Misinformation Dynamics in Multiplex Online Communication Networks',
      authors: ['K. Vasan', 'Julian Becker', 'Claire Beauchamp', 'T. R. S. Raman'],
      year: 2025,
      venue: 'Nature Human Behaviour',
      venueType: 'journal',
      volume: '9',
      issue: '4',
      pages: '512--524',
      doi: '10.1038/s41562-025-01984-7',
      pdfUrl: '#',
      codeUrl: 'https://github.com/kvasan-lab/multiplex-cascades',
      datasetUrl: '#',
      abstract: 'Analyzing 42 million message threads across interconnected social messaging platforms, we uncover how cross-platform bridge nodes dictate cascade virality. We develop a multi-type marked Hawkes process that predicts cascade breakout probabilities 3 hours earlier than single-platform baselines, providing algorithmic interventions to dampen non-linear viral amplification.',
      citations: 112,
      highlighted: true,
      topicId: 'info-diffusion',
      bibtex: `@article{vasan2025cascading,
  title={Cascading Misinformation Dynamics in Multiplex Online Communication Networks},
  author={Vasan, K. and Becker, Julian and Beauchamp, Claire and Raman, T. R. S.},
  journal={Nature Human Behaviour},
  volume={9},
  number={4},
  pages={512--524},
  year={2025},
  publisher={Nature Publishing Group},
  doi={10.1038/s41562-025-01984-7}
}`
    },
    {
      id: 'pub-2024-1',
      title: 'Decentralized Stochastic Optimization with Exact Linear Convergence on Directed Time-Varying Graphs',
      authors: ['K. Vasan', 'Arun K. Sharma', 'Hao Zhang'],
      year: 2024,
      venue: 'Advances in Neural Information Processing Systems (NeurIPS)',
      venueType: 'conference',
      doi: '10.5555/3618408.3619204',
      pdfUrl: '#',
      codeUrl: 'https://github.com/kvasan-lab/async-push-sum',
      slidesUrl: '#',
      abstract: 'We resolve an open problem regarding exact linear convergence of decentralized stochastic gradient descent under row-stochastic directed communication topologies without double-stochastic assumptions. We introduce Directed-ExactSGD, proving O(1/k) sublinear convergence for general smooth convex objectives and geometric convergence to the exact minimizer with variance reduction.',
      citations: 148,
      highlighted: true,
      topicId: 'distributed-opt',
      bibtex: `@inproceedings{vasan2024decentralized,
  title={Decentralized Stochastic Optimization with Exact Linear Convergence on Directed Time-Varying Graphs},
  author={Vasan, K. and Sharma, Arun K. and Zhang, Hao},
  booktitle={Advances in Neural Information Processing Systems (NeurIPS)},
  volume={37},
  pages={28410--28424},
  year={2024}
}`
    },
    {
      id: 'pub-2024-2',
      title: 'Mitigating Structural Bias and Over-smoothing in Geometric Deep Learning: A Survey and Taxonomy',
      authors: ['K. Vasan', 'Elena Rostova', 'P. K. Nambiar'],
      year: 2024,
      venue: 'ACM Computing Surveys (CSUR)',
      venueType: 'journal',
      volume: '56',
      issue: '9',
      pages: '1--38',
      doi: '10.1145/3643890',
      pdfUrl: '#',
      abstract: 'A comprehensive theoretical and empirical survey of over-smoothing, over-squashing, and degree-related structural inductive bias across 250+ graph neural architectures. We propose a unified spectral curvature diagnostic taxonomy to classify existing regularization and topological rewiring techniques.',
      citations: 215,
      highlighted: false,
      topicId: 'graph-learning',
      bibtex: `@article{vasan2024mitigating,
  title={Mitigating Structural Bias and Over-smoothing in Geometric Deep Learning: A Survey and Taxonomy},
  author={Vasan, K. and Rostova, Elena and Nambiar, P. K.},
  journal={ACM Computing Surveys},
  volume={56},
  number={9},
  pages={1--38},
  year={2024},
  publisher={ACM New York, NY, USA},
  doi={10.1145/3643890}
}`
    },
    {
      id: 'pub-2023-1',
      title: 'Topological Resilience of Interdependent Critical Infrastructure under Targeted Hypergraph Attacks',
      authors: ['K. Vasan', 'Jonathan Sterling', 'R. G. MacIntyre'],
      year: 2023,
      venue: 'Physical Review E',
      venueType: 'journal',
      volume: '108',
      issue: '3',
      pages: '034301',
      doi: '10.1103/PhysRevE.108.034301',
      pdfUrl: '#',
      codeUrl: 'https://github.com/kvasan-lab/hyper-percolation',
      datasetUrl: '#',
      abstract: 'Critical infrastructure systems exhibit multi-way interdependencies best characterized by hypergraphs rather than pairwise networks. We formulate a novel site-bond hypergraph percolation model and analytically compute the first-order discontinuous phase transition threshold for system-wide blackout collapse.',
      citations: 182,
      highlighted: false,
      topicId: 'info-diffusion',
      bibtex: `@article{vasan2023topological,
  title={Topological Resilience of Interdependent Critical Infrastructure under Targeted Hypergraph Attacks},
  author={Vasan, K. and Sterling, Jonathan and MacIntyre, R. G.},
  journal={Physical Review E},
  volume={108},
  number={3},
  pages={034301},
  year={2023},
  publisher={APS},
  doi={10.1103/PhysRevE.108.034301}
}`
    },
    {
      id: 'pub-2023-2',
      title: 'FedGraph-DP: Differentially Private Federated Learning for Distributed Attributed Graphs',
      authors: ['K. Vasan', 'Sophia Lin', 'T. R. S. Raman'],
      year: 2023,
      venue: 'ACM SIGKDD Conference on Knowledge Discovery and Data Mining (KDD)',
      venueType: 'conference',
      doi: '10.1145/3580305.3599420',
      pdfUrl: '#',
      codeUrl: 'https://github.com/kvasan-lab/fedgraph-dp',
      slidesUrl: '#',
      abstract: 'Collaborative model training across siloed financial and biomedical graphs requires stringent edge and node privacy guarantees. FedGraph-DP introduces an algorithmic framework leveraging localized gradient perturbation with amplified Renyi differential privacy accountants, achieving a Pareto-optimal privacy-accuracy trade-off.',
      citations: 164,
      highlighted: false,
      topicId: 'distributed-opt',
      bibtex: `@inproceedings{vasan2023fedgraph,
  title={FedGraph-DP: Differentially Private Federated Learning for Distributed Attributed Graphs},
  author={Vasan, K. and Lin, Sophia and Raman, T. R. S.},
  booktitle={Proceedings of the 29th ACM SIGKDD Conference on Knowledge Discovery and Data Mining},
  pages={2205--2215},
  year={2023}
}`
    },
    {
      id: 'pub-2022-1',
      title: 'Spectral Curvature Bounds for Certified Robustness in Graph Convolutional Networks',
      authors: ['K. Vasan', 'David K. Miller'],
      year: 2022,
      venue: 'International Conference on Artificial Intelligence and Statistics (AISTATS)',
      venueType: 'conference',
      doi: '10.48550/arXiv.2201.07632',
      pdfUrl: '#',
      codeUrl: 'https://github.com/kvasan-lab/spectral-robust-gcn',
      abstract: 'Adversarial topology poisoning poses severe threats in mission-critical graph classification. We formulate a certifiable defense based on Ollivier-Ricci curvature bounds along graph boundaries, deriving exact convex certificates against arbitrary L0-bounded topology attacks.',
      citations: 230,
      highlighted: false,
      topicId: 'trustworthy-ai',
      bibtex: `@inproceedings{vasan2022spectral,
  title={Spectral Curvature Bounds for Certified Robustness in Graph Convolutional Networks},
  author={Vasan, K. and Miller, David K.},
  booktitle={International Conference on Artificial Intelligence and Statistics},
  pages={6890--6905},
  year={2022}
}`
    }
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'Ph.D. in Computer Science & Engineering',
      field: 'Higher-Order Graph Representation Learning & Geometric Deep Learning',
      institution: 'Institute for Computational Systems & Network Science',
      year: '2022 – Present (Expected Spring 2027)',
      dissertation: 'Provably Expressive Geometric Deep Learning on High-Order Networks and Manifolds',
      advisor: 'Prof. David K. Miller (Co-Advisor: Prof. Elena Rostova)',
      honors: 'Institute Doctoral Research Fellowship, Advanced to Candidacy with Distinction'
    },
    {
      id: 'edu-2',
      degree: 'M.S. in Computer Science',
      field: 'Machine Learning & High Performance Optimization',
      institution: 'Carnegie Mellon University',
      year: '2020 – 2022',
      advisor: 'Prof. A. S. Venkatesh',
      honors: 'Summa Cum Laude (GPA: 3.96/4.0)'
    },
    {
      id: 'edu-3',
      degree: 'B.Tech in Computer Science and Engineering',
      field: 'Computer Engineering & Applied Mathematics',
      institution: 'Indian Institute of Technology (IIT)',
      year: '2016 – 2020',
      honors: 'Institute Silver Medal, Dean\'s Honor List'
    }
  ],
  engagements: [
    {
      id: 'eng-1',
      type: 'keynote',
      title: 'ICML 2025 Workshop on Topological Deep Learning',
      role: 'Invited Keynote Speaker',
      eventOrHost: '42nd International Conference on Machine Learning (ICML)',
      location: 'Vancouver Convention Centre, BC, Canada',
      date: 'July 2025',
      talkTitle: 'Beyond 1-WL: Cellular Sheaves and Spectral Invariants in Higher-Order Graph Transformers',
      description: 'Delivered a 50-minute keynote address discussing mathematical sheaf theory applications in geometric deep learning, with 250+ in-person researchers and live-stream attendees.',
      slidesUrl: '#',
      videoUrl: '#',
      photos: []
    },
    {
      id: 'eng-2',
      type: 'visit',
      title: 'Visiting Research Fellowship in Complex Systems',
      role: 'Visiting Scholar & Fellow',
      eventOrHost: 'Max Planck Institute for Mathematics in the Sciences (MPI MiS)',
      location: 'Leipzig, Germany',
      date: 'September – October 2025',
      hostPerson: 'Host: Prof. Dr. Jürgen Jost (Complex Systems Group)',
      description: 'Spent 6 weeks collaborating with the Complex Systems and Geometry group on discrete Ricci curvature flows and hypergraph percolation theory for multi-scale biological networks.',
      photos: []
    },
    {
      id: 'eng-3',
      type: 'presentation',
      title: 'NeurIPS 2024 Oral Presentation',
      role: 'Conference Oral Speaker',
      eventOrHost: '38th Annual Conference on Neural Information Processing Systems',
      location: 'New Orleans, LA, USA',
      date: 'December 2024',
      talkTitle: 'Decentralized Stochastic Optimization with Exact Linear Convergence on Directed Time-Varying Graphs',
      description: 'Oral presentation (top 1.8% of accepted papers) presenting theoretical proofs for row-stochastic directed consensus without gradient tracking delays.',
      slidesUrl: '#',
      photos: []
    },
    {
      id: 'eng-4',
      type: 'visit',
      title: 'Distinguished Seminar & Lab Visit',
      role: 'Invited Colloquium Speaker',
      eventOrHost: 'The Alan Turing Institute & Oxford Mathematical Institute',
      location: 'London & Oxford, United Kingdom',
      date: 'May 2024',
      hostPerson: 'Hosts: Prof. Renaud Lambiotte & Dr. Michael Bronstein',
      talkTitle: 'Certified Topological Robustness and Spectral Curvature Bounds',
      description: 'Visited the Data Science and Graph Machine Learning groups, delivering two seminars and engaging in joint discussions on trustworthy network algorithms.',
      photos: []
    }
  ],
  experience: [
    {
      id: 'exp-1',
      role: 'Ph.D. Research Scholar & Graduate Research Assistant',
      organization: 'Institute for Computational Systems & Network Science',
      department: 'Network Dynamics & Scalable Intelligence Lab',
      period: '2022 – Present',
      description: 'Conducting doctoral research on cellular sheaf graph neural networks, higher-order topological representations, and decentralized graph optimization advised by Prof. David K. Miller.'
    },
    {
      id: 'exp-2',
      role: 'Visiting Research Fellow',
      organization: 'Max Planck Institute for Mathematics in the Sciences (MPI MiS)',
      department: 'Complex Systems & Geometry Group, Leipzig, Germany',
      period: 'Fall 2025',
      description: 'Investigated discrete Ollivier-Ricci curvature bounds and hypergraph percolation models with Prof. Dr. Jürgen Jost.'
    },
    {
      id: 'exp-3',
      role: 'Research Scientist Intern',
      organization: 'Google Research / DeepMind',
      department: 'Graph Mining & Machine Learning Group',
      period: 'Summer 2024',
      description: 'Designed sub-quadratic attention mechanisms for large-scale relational knowledge graphs.'
    }
  ],
  grants: [
    {
      id: 'grant-1',
      title: 'Institute Doctoral Research Fellowship',
      fundingAgency: 'Institute for Computational Systems & Network Science',
      amount: '$185,000 (Full 5-Year Tuition & Stipend)',
      period: '2022 – 2027',
      role: 'Doctoral Fellow'
    },
    {
      id: 'grant-2',
      title: 'ACM SIGKDD Student Travel Grant',
      fundingAgency: 'ACM SIGKDD / NSF',
      amount: '$1,800',
      period: '2025',
      role: 'Recipient'
    },
    {
      id: 'grant-3',
      title: 'NeurIPS Scholar Travel Award',
      fundingAgency: 'Neural Information Processing Systems Foundation',
      amount: '$1,500',
      period: '2024',
      role: 'Recipient'
    }
  ],
  awards: [
    {
      id: 'award-1',
      title: 'Best Student Paper Runner-Up Award',
      conferringBody: 'ACM SIGKDD International Conference (KDD)',
      year: '2023',
      description: 'For outstanding contributions to differentially private federated graph learning.'
    },
    {
      id: 'award-2',
      title: 'Advanced to Doctoral Candidacy with Distinction',
      conferringBody: 'Doctoral Examination Committee, CS Department',
      year: '2024',
      description: 'Recognizing superior performance in Ph.D. comprehensive qualification and thesis proposal defense.'
    },
    {
      id: 'award-3',
      title: 'Outstanding Graduate Teaching Assistant Award',
      conferringBody: 'School of Computer Science',
      year: '2023',
      description: 'Awarded for excellence in graduate course instruction and student mentoring.'
    },
    {
      id: 'award-4',
      title: 'Institute Silver Medal for Academic Excellence',
      conferringBody: 'Indian Institute of Technology (IIT)',
      year: '2020',
      description: 'Ranked top in undergraduate graduating cohort.'
    }
  ],
  teaching: [
    {
      id: 'teach-1',
      courseCode: 'CS 8420',
      courseTitle: 'Advanced Graph Representation Learning & Geometric Deep Learning',
      role: 'Head Graduate Teaching Assistant',
      institution: 'Graduate Level Seminar',
      terms: 'Spring 2024, Spring 2025, Spring 2026'
    },
    {
      id: 'teach-2',
      courseCode: 'CS 6310',
      courseTitle: 'Algorithmic Network Analysis and Complex Dynamic Systems',
      role: 'Graduate Teaching Assistant',
      institution: 'Undergraduate Core / Graduate Elective',
      terms: 'Fall 2023, Fall 2024'
    },
    {
      id: 'teach-3',
      courseCode: 'CS 2100',
      courseTitle: 'Data Structures and Discrete Algorithms',
      role: 'Lab Instructor & Tutor',
      institution: 'Undergraduate Core',
      terms: 'Spring 2023'
    }
  ],
  service: [
    {
      id: 'serv-1',
      category: 'Reviewer',
      details: 'Peer Reviewer: NeurIPS (2024, 2025), ICML (2025, 2026), ICLR (2025), KDD (2024, 2025), IEEE TPAMI.'
    },
    {
      id: 'serv-2',
      category: 'Community',
      details: 'Student Volunteer: ICML 2025 (Vancouver), NeurIPS 2024 (New Orleans).'
    },
    {
      id: 'serv-3',
      category: 'Institutional',
      details: 'Department Graduate Student Council Representative (2023 – Present), Graduate Peer Mentoring Program Mentor.'
    }
  ]
};
