const codeInput = document.getElementById("codeInput");
const outputText = document.getElementById("outputText");
const runStatus = document.getElementById("runStatus");
const feedback = document.getElementById("feedback");
const toast = document.getElementById("toast");

let xp = 320;
let completed = 4;
let hintsUsed = 3;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function runCode() {
  const code = codeInput.value.trim();
  outputText.textContent = "";
  feedback.textContent = "";

  // This is a safe, browser-based demo validator for the sample Python challenge.
  // It checks the expected beginner task instead of executing arbitrary code.
  const hasPrint = /\bprint\s*\(/.test(code);
  const hasHello = /Hello,\s*World!/.test(code);

  if (!code) {
    outputText.textContent = "No code found. Type your solution first.";
    runStatus.textContent = "Needs input";
    feedback.style.color = "#f0c77c";
    feedback.textContent = "Start by writing a print() statement.";
    return;
  }

  if (hasPrint && hasHello) {
    outputText.textContent = "Hello, World!\n\n✓ Program completed successfully.";
    runStatus.textContent = "Success";
    feedback.style.color = "#91e8c3";
    feedback.textContent = "Excellent work! You passed the challenge and earned 20 XP.";
    xp += 20;
    document.getElementById("xpCount").textContent = xp;
    document.getElementById("completedCount").innerHTML = `${String(++completed).padStart(2, "0")} <span>/ 12</span>`;
    document.getElementById("badgeCount").textContent = "04";
    document.querySelector(".mini-progress i").style.width = `${Math.min(100, completed / 12 * 100)}%`;
    showToast("+20 XP · Challenge completed!");
    document.querySelector(".live-label").innerHTML = '<i></i> PASSED';
  } else {
    outputText.textContent = "Your program ran, but the expected message was not found.";
    runStatus.textContent = "Try again";
    feedback.style.color = "#f0c77c";
    feedback.textContent = "Check that your print() statement outputs exactly: Hello, World!";
  }
}

document.getElementById("runBtn").addEventListener("click", runCode);
document.getElementById("hintBtn").addEventListener("click", () => {
  hintsUsed++;
  feedback.style.color = "#c8baff";
  feedback.textContent = 'Hint: Python uses print("your message") to display text on the screen.';
  showToast(`Learning hint ${hintsUsed} opened`);
});
document.getElementById("resetBtn").addEventListener("click", () => {
  codeInput.value = 'message = "Hello, World!"\nprint(message)';
  outputText.textContent = "Your result will appear here when you run your code.";
  runStatus.textContent = "Waiting for your code...";
  feedback.textContent = "";
  document.querySelector(".live-label").innerHTML = '<i></i> READY';
});
document.getElementById("continueBtn").addEventListener("click", () => {
  document.getElementById("workspace").scrollIntoView({ behavior: "smooth" });
});
document.querySelectorAll("[data-mission]").forEach(button => {
  button.addEventListener("click", () => {
    const missions = {
      space: ["Rescue the Space Station", 'Mission loaded: calculate the crew oxygen supply. Start with variables and basic arithmetic.'],
      forest: ["Forest of Hidden Numbers", "Mission preview: use a loop to follow number clues and discover the hidden path."],
      ocean: ["Ocean of Decisions", "Mission preview: use if/else conditions to help the research team make a decision."]
    };
    const [name, message] = missions[button.dataset.mission];
    showToast(`${name} selected`);
    feedback.style.color = "#c8baff";
    feedback.textContent = message;
    document.getElementById("workspace").scrollIntoView({ behavior: "smooth" });
  });
});
document.getElementById("allMissionsBtn").addEventListener("click", () => showToast("All 12 learning missions are part of this demo roadmap."));
document.getElementById("leaderboardBtn").addEventListener("click", () => showToast("You're currently ranked #2 in this demo leaderboard."));
document.getElementById("badgeInfoBtn").addEventListener("click", () => showToast("Complete missions, practise regularly, and use hints to unlock badges."));
