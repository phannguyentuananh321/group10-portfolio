/**
 * SCRIPT CHÍNH - NHÓM 10 PORTFOLIO
 * Quản lý dữ liệu thành viên, dự án, hiệu ứng Cinematic Intro,
 * Hover Preview (không zoom) và Cinematic Zoom-in Detail View.
 */

// 1. Dữ liệu hồ sơ năng lực 3 thành viên nòng cốt
const membersData = [
  {
    id: 1,
    name: "Niê Ngọc Lâm",
    category: ["frontend", "backend", "fullstack"],
    role: "Fullstack Developer • Kiến trúc hệ thống",
    studentId: "24127436",
    email: "24127436@student.hcmus.edu.vn",
    phone: "0912 345 678",
    status: "Đang tích cực phát triển đồ án",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80",
    shortBio: "Định hướng kiến trúc kỹ thuật hệ thống, phát triển các module Fullstack cốt lõi.",
    careerGoal: "Trở thành Chuyên gia Giải pháp Phần mềm (Software Solution Architect) chuyên sâu về Web & Cloud Services.",
    fullBio: "Sinh viên Khóa 2024 Khoa Công nghệ Thông tin - Trường ĐH Khoa học Tự nhiên, ĐHQG-HCM. Có đam mê mãnh liệt với công nghệ web hiện đại, xây dựng kiến trúc ứng dụng bền vững và quản trị mã nguồn. Trong nhóm, Lâm giữ vai trò trụ cột kỹ thuật, thiết kế cấu trúc hệ thống và hỗ trợ các thành viên giải quyết bài toán kỹ thuật phức tạp.",
    skills: [
      { name: "React / Next.js", level: 92 },
      { name: "Node.js & Express API", level: 88 },
      { name: "Kiến trúc hệ thống & Git Flow", level: 90 },
      { name: "Tối ưu hóa hiệu năng & Security", level: 86 }
    ],
    tasks: [
      "Thiết kế cấu trúc mã nguồn và kiến trúc tổng thể của sản phẩm.",
      "Tích hợp và kết nối các thành phần Frontend với logic ứng dụng và API.",
      "Review code và hỗ trợ các thành viên giải quyết các vấn đề kỹ thuật.",
      "Triển khai máy chủ, cấu hình môi trường và tối ưu tốc độ tải trang."
    ],
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      facebook: "https://facebook.com"
    }
  },
  {
    id: 2,
    name: "Nguyễn Lương Hoàng Duy",
    category: ["leader", "frontend"],
    role: "Trưởng nhóm • Frontend & UI/UX Specialist",
    studentId: "24127352",
    email: "24127352@student.hcmus.edu.vn",
    phone: "0934 567 890",
    status: "Sẵn sàng nhận dự án",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=400&q=80",
    shortBio: "Trưởng nhóm, phụ trách điều phối tiến độ, thiết kế trải nghiệm người dùng và phát triển giao diện web.",
    careerGoal: "Trở thành Tech Lead / Senior Product Designer chuyên tạo ra những sản phẩm số chuẩn mực quốc tế.",
    fullBio: "Sinh viên Khóa 2024 Khoa Công nghệ Thông tin - Trường ĐH Khoa học Tự nhiên, ĐHQG-HCM. Đảm nhận vai trò Trưởng nhóm (Leader) điều phối tổng thể tiến độ và phân chia công việc. Đồng thời là chuyên gia về thiết kế đồ họa tương tác và phát triển giao diện người dùng, Duy luôn chú trọng đến tính thẩm mỹ hiện đại, tinh thần gắn kết nhóm và trải nghiệm mượt mà của website.",
    skills: [
      { name: "Quản lý dự án & Team Leadership", level: 94 },
      { name: "HTML5 / CSS3 / SCSS Modern", level: 92 },
      { name: "Figma UI/UX & Design Systems", level: 90 },
      { name: "JavaScript (ES6+) & Responsive", level: 88 }
    ],
    tasks: [
      "Lập kế hoạch phân bổ công việc, theo dõi tiến độ tổng thể và kết nối các thành viên trong nhóm.",
      "Xây dựng wireframe, mockup và Design System giao diện trực quan trên Figma.",
      "Hiện thực hóa giao diện website chuẩn Responsive trên Mobile, Tablet và Desktop.",
      "Tổ chức họp nhóm định kỳ, nghiệm thu chất lượng các module trước khi hoàn thiện."
    ],
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      facebook: "https://facebook.com"
    }
  },
  {
    id: 3,
    name: "Phan Nguyễn Tuấn Anh",
    category: "backend",
    role: "Backend Developer • QA & Testing",
    studentId: "24127321",
    email: "24127321@student.hcmus.edu.vn",
    phone: "0908 123 456",
    status: "Đang tích cực phát triển đồ án",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    shortBio: "Xây dựng logic xử lý dữ liệu, kiểm thử phần mềm và đảm bảo chất lượng hệ thống.",
    careerGoal: "Trở thành Backend Engineer & QA Lead phụ trách các hệ thống phân tán và bảo mật dữ liệu.",
    fullBio: "Sinh viên Khóa 2024 Khoa Công nghệ Thông tin - Trường ĐH Khoa học Tự nhiên, ĐHQG-HCM. Đam mê tìm hiểu hệ thống cơ sở dữ liệu, logic xử lý nghiệp vụ và kiểm thử phần mềm. Tuấn Anh đảm nhận việc xây dựng cấu trúc dữ liệu, kiểm thử toàn diện để đảm bảo website hoạt động ổn định và tin cậy.",
    skills: [
      { name: "JavaScript & Node.js Core", level: 88 },
      { name: "Cơ sở dữ liệu & API RESTful", level: 85 },
      { name: "Kiểm thử phần mềm (QA Testing)", level: 88 },
      { name: "Kỹ năng tài liệu hóa kỹ thuật", level: 90 }
    ],
    tasks: [
      "Thiết kế cấu trúc dữ liệu, xử lý logic bộ lọc và tìm kiếm thành viên.",
      "Thực hiện kiểm thử chức năng, tính tương thích trên các trình duyệt khác nhau.",
      "Tối ưu hóa hiệu năng tải trang và xử lý tương tác cửa sổ chi tiết (modal).",
      "Soạn thảo tài liệu báo cáo kỹ thuật và kiểm tra chuẩn hóa mã nguồn."
    ],
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      facebook: "https://facebook.com"
    }
  }
];

// 2. Danh sách dự án nhóm tiêu biểu
const projectsData = [
  {
    id: 1,
    title: "Nexus Campus Hub",
    category: "Fullstack Web App",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
    description: "Nền tảng trực tuyến hỗ trợ sinh viên quản lý lịch học, tra cứu tài liệu môn học và phối hợp nhóm thông minh.",
    tech: ["JavaScript", "HTML5", "CSS3", "REST API", "LocalStorage"],
    contributions: [
      { member: "Hoàng Duy (Lead)", role: "Điều phối dự án & Thiết kế Figma Responsive" },
      { member: "Ngọc Lâm", role: "Kiến trúc hệ thống & Quản lý state" },
      { member: "Tuấn Anh", role: "Xử lý dữ liệu & Viết kịch bản kiểm thử" }
    ]
  },
  {
    id: 2,
    title: "Smart Taskflow Pro",
    category: "Productivity Tool",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=600&q=80",
    description: "Ứng dụng quản trị tác vụ theo mô hình Agile/Kanban với khả năng phân loại thẻ việc và lưu trữ thời gian thực.",
    tech: ["JavaScript ES6+", "Drag & Drop API", "CSS Grid", "Dark Theme"],
    contributions: [
      { member: "Hoàng Duy (Lead)", role: "Quản lý tiến độ & Giao diện tối/sáng" },
      { member: "Ngọc Lâm", role: "Điều phối logic kéo thả (Drag & Drop)" },
      { member: "Tuấn Anh", role: "Bộ nhớ lưu trữ IndexedDB & Bắt lỗi" }
    ]
  },
  {
    id: 3,
    title: "EcoStore Tech Showcase",
    category: "E-Commerce Landing",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    description: "Trang thương mại điện tử giới thiệu sản phẩm công nghệ xanh với bộ lọc tương tác nhanh và giỏ hàng mini.",
    tech: ["HTML5", "Modern CSS", "JavaScript", "Filter Engine"],
    contributions: [
      { member: "Hoàng Duy (Lead)", role: "Định hình thương hiệu & Thiết kế UI" },
      { member: "Ngọc Lâm", role: "Xây dựng logic giỏ hàng & Tính toán" },
      { member: "Tuấn Anh", role: "Kiểm thử đa nền tảng (Cross-browser QA)" }
    ]
  }
];

/* ==========================================================================
   DOM Elements
   ========================================================================== */
const membersGrid = document.getElementById("members-grid");
const emptyState = document.getElementById("empty-state");
const searchInput = document.getElementById("search-input");
const clearSearchBtn = document.getElementById("clear-search");
const filterButtons = document.querySelectorAll(".filter-btn");
const resetFilterBtn = document.getElementById("reset-filter-btn");
const projectsGrid = document.getElementById("projects-grid");

// Modal elements
const modalOverlay = document.getElementById("member-modal");
const modalContent = document.getElementById("modal-content");
const modalCloseBtn = document.getElementById("modal-close-btn");

/* ==========================================================================
   State Management & Init (Cố định Light Theme)
   ========================================================================== */
let currentCategory = "all";
let currentSearchTerm = "";
let isAnimating = false; // Khóa click khi animation đang chạy
let activeOpeningCard = null; // Lưu thẻ card đang được mở
let scrollRevealObserver = null;

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initCinematicIntro();
  renderMembers();
  renderProjects();
  initScrollReveal();
  setupEventListeners();
});

function initTheme() {
  document.body.setAttribute("data-theme", "light");
  try {
    localStorage.setItem("nhom10_theme", "light");
  } catch (e) {}
}

function initCinematicIntro() {
  const intro = document.getElementById("cinematic-intro");
  const skipBtn = document.getElementById("skip-intro-btn");
  if (!intro) return;

  function dismissIntro() {
    if (intro.classList.contains("is-dismissed")) return;
    intro.classList.add("is-dismissed");
    setTimeout(() => {
      intro.style.display = "none";
      // Kích hoạt quan sát và hiển thị các phần tử trong màn hình sau khi intro đóng
      observeScrollElements();
    }, 650);
  }

  if (skipBtn) {
    skipBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      dismissIntro();
    });
  }

  intro.addEventListener("click", dismissIntro);

  // Tự động chuyển sau 1.8s
  setTimeout(dismissIntro, 1800);
}

/* ==========================================================================
   Scroll-Triggered Fade-In / Reveal Animation
   ========================================================================== */
function initScrollReveal() {
  if ("IntersectionObserver" in window) {
    scrollRevealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            scrollRevealObserver.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -40px 0px",
        threshold: 0.1
      }
    );
  }

  observeScrollElements();
}

function observeScrollElements() {
  const elements = document.querySelectorAll(".reveal-on-scroll:not(.is-revealed)");
  if (!scrollRevealObserver) {
    elements.forEach((el) => el.classList.add("is-revealed"));
    return;
  }
  elements.forEach((el) => {
    scrollRevealObserver.observe(el);
  });
}

/* ==========================================================================
   Render Members - Default Minimal View + Hover Preview
   ========================================================================== */
function renderMembers() {
  if (!membersGrid) return;

  const filtered = membersData.filter((member) => {
    const matchesCategory =
      currentCategory === "all" ||
      (Array.isArray(member.category)
        ? member.category.includes(currentCategory)
        : member.category === currentCategory);

    const term = currentSearchTerm.toLowerCase().trim();
    const matchesSearch =
      !term ||
      member.name.toLowerCase().includes(term) ||
      member.role.toLowerCase().includes(term) ||
      member.studentId.toLowerCase().includes(term) ||
      member.skills.some((s) => s.name.toLowerCase().includes(term));

    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    membersGrid.innerHTML = "";
    if (emptyState) emptyState.classList.remove("hidden");
    return;
  }

  if (emptyState) emptyState.classList.add("hidden");

  membersGrid.innerHTML = filtered
    .map((member, idx) => {
      // 3 kỹ năng tiêu biểu trong hover preview
      const topSkills = member.skills
        .slice(0, 3)
        .map((s) => `<span class="preview-skill-tag">${escapeHTML(s.name)}</span>`)
        .join("");

      const delayClass = `reveal-delay-${(idx % 3) + 1}`;

      return `
        <article class="member-card reveal-on-scroll ${delayClass}" data-id="${member.id}" tabindex="0" role="button" aria-label="Xem hồ sơ ${escapeHTML(member.name)}">
          <!-- Hiệu ứng hào quang khi được chọn -->
          <div class="card-glow-pulse" aria-hidden="true"></div>

          <!-- 1. TRẠNG THÁI MẶC ĐỊNH: CHỈ HIỂN THỊ ẢNH, TÊN VÀ MSSV -->
          <div class="card-default-view">
            <div class="avatar-wrapper">
              <img class="avatar-img" src="${member.avatar}" alt="${escapeHTML(member.name)}" loading="lazy" />
              <span class="status-indicator" title="${escapeHTML(member.status)}"></span>
            </div>

            <div class="card-basic-info">
              <h3 class="member-name">${escapeHTML(member.name)}</h3>
              <div class="member-mssv">
                <i class="fa-solid fa-id-badge"></i> MSSV: ${escapeHTML(member.studentId)}
              </div>
            </div>
          </div>

          <!-- Nút xem chi tiết dành cho thiết bị cảm ứng (Mobile/Tablet) -->
          <div class="mobile-action-hint">
            <span class="btn-tap-detail">Xem chi tiết <i class="fa-solid fa-arrow-right"></i></span>
          </div>

          <!-- 2. HOVER PREVIEW: CHỈ HIỂN THỊ KHI RÊ CHUỘT (TUYỆT ĐỐI KHÔNG ZOOM CARD) -->
          <div class="card-hover-preview" aria-hidden="true">
            <div class="preview-role-badge">${escapeHTML(member.role)}</div>
            <p class="preview-bio">${escapeHTML(member.shortBio)}</p>
            <div class="preview-skills-list">
              ${topSkills}
            </div>
            <div class="preview-cta-hint">
              <i class="fa-solid fa-arrow-up-right-from-square"></i> Nhấn để xem chi tiết
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  // Gắn sự kiện Click và Keyboard
  document.querySelectorAll(".member-card").forEach((card) => {
    card.addEventListener("click", (e) => {
      const id = parseInt(card.getAttribute("data-id"), 10);
      handleMemberCardClick(card, id);
    });

    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const id = parseInt(card.getAttribute("data-id"), 10);
        handleMemberCardClick(card, id);
      }
    });
  });

  // Quan sát các phần tử mới render
  observeScrollElements();
}

/* ==========================================================================
   Cinematic Zoom-In & Glow Animation
   ========================================================================== */
function handleMemberCardClick(card, memberId) {
  // 1. Kiểm tra khóa thao tác click lặp
  if (isAnimating) return;
  isAnimating = true;

  activeOpeningCard = card;

  // 2. Giai đoạn A & B: Zoom-in và phát sáng card được chọn
  membersGrid.classList.add("has-opening");
  card.classList.add("is-opening");

  // Cuộn nhẹ để card nằm trong tầm nhìn nếu cần
  const cardRect = card.getBoundingClientRect();
  const isOutOfView = cardRect.top < 60 || cardRect.bottom > window.innerHeight;
  if (isOutOfView) {
    card.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  // 3. Giai đoạn C: Chuyển sang Member Detail sau 480ms (đúng thời lượng zoom-in)
  setTimeout(() => {
    openMemberModal(memberId);
  }, 480);
}

/* ==========================================================================
   Render Featured Projects
   ========================================================================== */
function renderProjects() {
  if (!projectsGrid) return;

  projectsGrid.innerHTML = projectsData
    .map((proj, idx) => {
      const contribHtml = proj.contributions
        .map(
          (c) => `
          <div class="contrib-item">
            <i class="fa-solid fa-circle-check"></i>
            <span><strong>${escapeHTML(c.member)}:</strong> ${escapeHTML(c.role)}</span>
          </div>
        `
        )
        .join("");

      const techHtml = proj.tech
        .map((t) => `<span class="tech-tag">${escapeHTML(t)}</span>`)
        .join("");

      const delayClass = `reveal-delay-${(idx % 3) + 1}`;

      return `
        <div class="project-card reveal-on-scroll ${delayClass}">
          <div class="project-thumb">
            <img src="${proj.image}" alt="${escapeHTML(proj.title)}" loading="lazy" />
            <span class="project-category-badge">${escapeHTML(proj.category)}</span>
          </div>
          <div class="project-body">
            <h3 class="project-title">${escapeHTML(proj.title)}</h3>
            <p class="project-desc">${escapeHTML(proj.description)}</p>

            <div class="project-roles-contrib">
              <span class="contrib-title">Đóng góp của 3 thành viên:</span>
              ${contribHtml}
            </div>

            <div class="project-tech-tags">
              ${techHtml}
            </div>
          </div>
        </div>
      `;
    })
    .join("");

  // Quan sát các phần tử mới render
  observeScrollElements();
}

/* ==========================================================================
   Modal Functions (Full Member Detail Profile)
   ========================================================================== */
function openMemberModal(memberId) {
  const member = membersData.find((m) => m.id === memberId);
  if (!member) {
    resetCardState();
    return;
  }

  const skillsHtml = member.skills
    .map(
      (skill) => `
      <div class="skill-progress-item">
        <div class="skill-progress-header">
          <span>${escapeHTML(skill.name)}</span>
          <span>${skill.level}%</span>
        </div>
        <div class="skill-bar-track">
          <div class="skill-bar-fill" style="width: ${skill.level}%"></div>
        </div>
      </div>
    `
    )
    .join("");

  const tasksHtml = member.tasks
    .map(
      (task) => `
      <li class="task-item">
        <i class="fa-solid fa-check-double"></i>
        <span>${escapeHTML(task)}</span>
      </li>
    `
    )
    .join("");

  modalContent.innerHTML = `
    <!-- Nút quay lại danh sách ở đầu trang chi tiết -->
    <div class="modal-top-actions">
      <button class="modal-back-btn" id="modal-back-btn" title="Quay lại danh sách">
        <i class="fa-solid fa-arrow-left"></i>
        <span>Quay lại danh sách</span>
      </button>
    </div>

    <div class="modal-hero">
      <img class="modal-avatar" src="${member.avatar}" alt="${escapeHTML(member.name)}" />
      <div class="modal-header-info">
        <span class="modal-role-pill">${escapeHTML(member.role)}</span>
        <h2 class="modal-name">${escapeHTML(member.name)}</h2>
        <div class="modal-meta-list">
          <span class="modal-meta-item"><i class="fa-solid fa-graduation-cap"></i> K24 - CNTT, ĐH KHTN</span>
          <span class="modal-meta-item"><i class="fa-solid fa-id-badge"></i> MSSV: ${escapeHTML(member.studentId)}</span>
          <span class="modal-meta-item"><i class="fa-solid fa-envelope"></i> ${escapeHTML(member.email)}</span>
          <span class="modal-meta-item"><i class="fa-solid fa-phone"></i> ${escapeHTML(member.phone)}</span>
        </div>
      </div>
    </div>

    <div class="modal-body">
      <div>
        <h3 class="modal-section-title"><i class="fa-solid fa-compass"></i> Mục tiêu & Định hướng nghề nghiệp</h3>
        <p class="modal-bio-text">${escapeHTML(member.careerGoal)}</p>
      </div>

      <div>
        <h3 class="modal-section-title"><i class="fa-solid fa-user-astronaut"></i> Tiểu sử & Kinh nghiệm</h3>
        <p class="modal-bio-text">${escapeHTML(member.fullBio)}</p>
      </div>

      <div>
        <h3 class="modal-section-title"><i class="fa-solid fa-sliders"></i> Năng lực chuyên môn</h3>
        <div class="skills-progress-list">
          ${skillsHtml}
        </div>
      </div>

      <div>
        <h3 class="modal-section-title"><i class="fa-solid fa-list-check"></i> Trách nhiệm & Đóng góp trong đồ án</h3>
        <ul class="tasks-list">
          ${tasksHtml}
        </ul>
      </div>

      <div class="modal-social-links">
        <a href="${member.socials.github}" target="_blank" rel="noopener" class="modal-social-btn">
          <i class="fa-brands fa-github"></i> GitHub cá nhân
        </a>
        <a href="mailto:${member.email}" class="modal-social-btn">
          <i class="fa-solid fa-envelope"></i> Gửi email trực tiếp
        </a>
        <button class="modal-social-btn" onclick="navigator.clipboard.writeText('${member.email}'); alert('Đã sao chép email: ${member.email}');">
          <i class="fa-solid fa-copy"></i> Sao chép Email
        </button>
      </div>
    </div>
  `;

  // Gắn sự kiện nút Quay lại trong modal
  const backBtn = document.getElementById("modal-back-btn");
  if (backBtn) {
    backBtn.addEventListener("click", closeMemberModal);
  }

  modalOverlay.classList.add("active");
  modalOverlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  // Mở xong -> Mở khóa thao tác
  isAnimating = false;
}

function closeMemberModal() {
  if (isAnimating) return;
  isAnimating = true;

  // 1. Fade out modal
  modalOverlay.classList.remove("active");
  modalOverlay.setAttribute("aria-hidden", "true");

  // 2. Chạy animation trả card về trạng thái bình thường
  setTimeout(() => {
    resetCardState();
    document.body.style.overflow = "";
    isAnimating = false;
  }, 280);
}

function resetCardState() {
  if (activeOpeningCard) {
    activeOpeningCard.classList.remove("is-opening");
    activeOpeningCard = null;
  }
  if (membersGrid) {
    membersGrid.classList.remove("has-opening");
  }
}

/* ==========================================================================
   Event Listeners
   ========================================================================== */
function setupEventListeners() {
  // Filter buttons
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentCategory = btn.getAttribute("data-filter");
      renderMembers();
    });
  });

  // Search input
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentSearchTerm = e.target.value;
      if (clearSearchBtn) {
        if (currentSearchTerm.length > 0) {
          clearSearchBtn.classList.add("active");
        } else {
          clearSearchBtn.classList.remove("active");
        }
      }
      renderMembers();
    });
  }

  // Clear search button
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", () => {
      searchInput.value = "";
      currentSearchTerm = "";
      clearSearchBtn.classList.remove("active");
      searchInput.focus();
      renderMembers();
    });
  }

  // Reset filter in empty state
  if (resetFilterBtn) {
    resetFilterBtn.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      currentSearchTerm = "";
      if (clearSearchBtn) clearSearchBtn.classList.remove("active");
      currentCategory = "all";
      filterButtons.forEach((b) => {
        b.classList.toggle("active", b.getAttribute("data-filter") === "all");
      });
      renderMembers();
    });
  }

  // Close modal events
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeMemberModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) {
        closeMemberModal();
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const intro = document.getElementById("cinematic-intro");
      if (intro && !intro.classList.contains("is-dismissed")) {
        intro.classList.add("is-dismissed");
        setTimeout(() => (intro.style.display = "none"), 500);
      } else if (modalOverlay && modalOverlay.classList.contains("active")) {
        closeMemberModal();
      }
    }
  });
}

/* ==========================================================================
   Helper Utilities
   ========================================================================== */
function escapeHTML(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
