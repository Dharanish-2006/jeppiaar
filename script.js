function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("active");
}

// Close menu after clicking a navigation link
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        document.getElementById("navLinks").classList.remove("active");
    });
});

/* ---------------- Registration form ---------------- */

const form = document.getElementById("registerForm");
const teamSizeSelect = document.getElementById("teamSize");
const membersContainer = document.getElementById("membersContainer");
const statusEl = document.getElementById("formStatus");
const submitBtn = document.getElementById("submitBtn");

// Build member inputs based on team size (leader + N-1 members)
function renderMembers() {
    const count = parseInt(teamSizeSelect.value, 10) - 1;
    membersContainer.innerHTML = "";

    for (let i = 1; i <= count; i++) {
        const block = document.createElement("div");
        block.className = "member-block form-row";
        block.innerHTML = `
            <div class="field">
                <label for="memberName${i}">Member ${i} Name *</label>
                <input type="text" id="memberName${i}" maxlength="80" required>
            </div>
            <div class="field">
                <label for="memberEmail${i}">Member ${i} Email *</label>
                <input type="email" id="memberEmail${i}" maxlength="120" required>
            </div>
        `;
        membersContainer.appendChild(block);
    }
}

teamSizeSelect.addEventListener("change", renderMembers);
renderMembers();

function setStatus(message, type) {
    statusEl.textContent = message;
    statusEl.className = "form-status " + (type || "");
}

function validate() {
    let ok = true;
    form.querySelectorAll(".field").forEach(f => f.classList.remove("invalid"));

    form.querySelectorAll("input[required], select[required]").forEach(el => {
        const empty = !el.value.trim();
        const badEmail = el.type === "email" && el.value && !/^\S+@\S+\.\S+$/.test(el.value.trim());
        if (empty || badEmail) {
            el.closest(".field").classList.add("invalid");
            ok = false;
        }
    });

    const phone = document.getElementById("leaderPhone");
    if (!/^[0-9+\-\s]{10,15}$/.test(phone.value.trim())) {
        phone.closest(".field").classList.add("invalid");
        ok = false;
    }

    return ok;
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    setStatus("", "");

    if (!validate()) {
        setStatus("Please fill all required fields correctly.", "error");
        return;
    }

    const members = [];
    const count = parseInt(teamSizeSelect.value, 10) - 1;
    for (let i = 1; i <= count; i++) {
        members.push({
            name: document.getElementById("memberName" + i).value.trim(),
            email: document.getElementById("memberEmail" + i).value.trim()
        });
    }

    const payload = {
        teamName: form.teamName.value.trim(),
        teamSize: parseInt(teamSizeSelect.value, 10),
        leaderName: form.leaderName.value.trim(),
        leaderEmail: form.leaderEmail.value.trim().toLowerCase(),
        leaderPhone: form.leaderPhone.value.trim(),
        college: form.college.value.trim(),
        department: form.department.value.trim(),
        year: form.year.value,
        members,
        domain: form.domain.value,
        idea: form.idea.value.trim(),
        website: form.website.value // honeypot
    };

    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";

    try {
        const res = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        const data = await res.json().catch(() => ({}));

        if (res.ok) {
            setStatus("🎉 Registration successful! See you at QuantiX'26.", "success");
            form.reset();
            renderMembers();
        } else {
            setStatus(data.error || "Something went wrong. Please try again.", "error");
        }
    } catch (err) {
        setStatus("Network error. Please check your connection and try again.", "error");
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Register Team →";
    }
});
