const providerSelect = document.getElementById('cloud-provider');
const vcpuRange = document.getElementById('vcpu-range');
const ramRange = document.getElementById('ram-range');
const storageRange = document.getElementById('storage-range');
const transferRange = document.getElementById('transfer-range');

const vcpuVal = document.getElementById('vcpu-val');
const ramVal = document.getElementById('ram-val');
const storageVal = document.getElementById('storage-val');
const transferVal = document.getElementById('transfer-val');

const computeCostEl = document.getElementById('compute-cost');
const storageCostEl = document.getElementById('storage-cost');
const transferCostEl = document.getElementById('transfer-cost');
const monthlyTotalEl = document.getElementById('monthly-total');
const yearlyTotalEl = document.getElementById('yearly-total');
const exportBtn = document.getElementById('export-btn');

function calculateCost() {
    const provider = providerSelect.value;
    const vcpus = parseInt(vcpuRange.value);
    const ram = parseInt(ramRange.value);
    const storage = parseInt(storageRange.value);
    const transfer = parseInt(transferRange.value);

    // Update UI labels
    vcpuVal.innerText = vcpus;
    ramVal.innerText = ram;
    storageVal.innerText = storage;
    transferVal.innerText = transfer;

    // Pricing multipliers based on provider
    let vcpuRate = 4.5;
    let ramRate = 1.2;
    let storageRate = 0.08;
    let transferRate = 0.05;

    if (provider === 'gcp') {
        vcpuRate = 4.2;
        ramRate = 1.1;
        storageRate = 0.07;
        transferRate = 0.04;
    } else if (provider === 'azure') {
        vcpuRate = 4.6;
        ramRate = 1.25;
        storageRate = 0.09;
        transferRate = 0.055;
    }

    const computeCost = (vcpus * vcpuRate) + (ram * ramRate);
    const storageCost = storage * storageRate;
    const transferCost = transfer * transferRate;

    const monthlyTotal = computeCost + storageCost + transferCost;
    const yearlyTotal = monthlyTotal * 12 * 0.9; // 10% annual discount simulation

    // Display values
    computeCostEl.innerText = `$${computeCost.toFixed(2)}`;
    storageCostEl.innerText = `$${storageCost.toFixed(2)}`;
    transferCostEl.innerText = `$${transferCost.toFixed(2)}`;
    monthlyTotalEl.innerText = `$${monthlyTotal.toFixed(2)}`;
    yearlyTotalEl.innerText = `$${yearlyTotal.toFixed(2)}`;
}

providerSelect.addEventListener('change', calculateCost);
vcpuRange.addEventListener('input', calculateCost);
ramRange.addEventListener('input', calculateCost);
storageRange.addEventListener('input', calculateCost);
transferRange.addEventListener('input', calculateCost);

// Initial calculation
calculateCost();

exportBtn.addEventListener('click', () => {
    alert('Estimation report successfully generated! You can now attach this to your portfolio.');
});