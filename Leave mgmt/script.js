// Simulate the leave balances for the user
let leaveBalances = {
    casual: 10,  // Casual Leave
    sick: 5      // Sick Leave
};

// Simulate leave history for the user
let leaveHistory = [];

// Function to update leave balance on the UI
function updateLeaveBalance() {
    document.getElementById('casualLeaveBalance').textContent = leaveBalances.casual;
    document.getElementById('sickLeaveBalance').textContent = leaveBalances.sick;
}

// Function to handle leave request form submission
document.getElementById('leaveForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get form data
    let leaveType = document.getElementById('leaveType').value;
    let startDate = new Date(document.getElementById('startDate').value);
    let endDate = new Date(document.getElementById('endDate').value);

    // Calculate the duration of the leave
    let leaveDuration = Math.ceil((endDate - startDate) / (1000 * 3600 * 24)) + 1; // Adding 1 to include the end day

    // Check if the user has enough leave balance
    if (leaveType === 'casual' && leaveBalances.casual >= leaveDuration) {
        leaveBalances.casual -= leaveDuration;
        leaveHistory.push({ type: 'Casual Leave', startDate, endDate, duration: leaveDuration, status: 'Approved' });
    } else if (leaveType === 'sick' && leaveBalances.sick >= leaveDuration) {
        leaveBalances.sick -= leaveDuration;
        leaveHistory.push({ type: 'Sick Leave', startDate, endDate, duration: leaveDuration, status: 'Approved' });
    } else {
        document.getElementById('statusMessage').textContent = 'Insufficient leave balance!';
        return;
    }

    // Update leave balance and display the status message
    updateLeaveBalance();
    document.getElementById('statusMessage').textContent = `Leave request for ${leaveDuration} days has been approved.`;

    // Add the new leave request to the leave history display
    displayLeaveHistory();
});

// Function to display leave history
function displayLeaveHistory() {
    let historyList = document.getElementById('leaveHistory');
    historyList.innerHTML = ''; // Clear previous history

    leaveHistory.forEach(leave => {
        let li = document.createElement('li');
        li.textContent = `${leave.type}: ${leave.startDate.toDateString()} - ${leave.endDate.toDateString()} (${leave.duration} day(s)) - Status: ${leave.status}`;
        historyList.appendChild(li);
    });
}

// Initialize the page with current leave balance and history
updateLeaveBalance();
displayLeaveHistory();
