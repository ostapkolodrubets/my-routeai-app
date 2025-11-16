document.getElementById("sendBtn").addEventListener("click", send);

async function send() {
    const start = document.getElementById("start").value.trim();
    const end = document.getElementById("end").value.trim();

    if(!start || !end) {
        alert("Please enter both addresses!");
        return;
    }

    document.getElementById("result").innerHTML = "Loading...";

    const payload = { start_address: start, end_address: end };

    try {
        const res = await fetch("https://my-routeai-backend-production.up.railway.app/route", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const data = await res.json();
        console.log(data);

        if(data) {
            document.getElementById("result").innerHTML = `
                <div class="result-card">
                    <h3>Route Link</h3>
                    <a href="${data.route}" target="_blank">Open in Google Maps</a>
                </div>
                <div class="result-card">
                    <h3>Recommendations</h3>
                    <pre>${data.advice}</pre>
                </div>
            `;
        }

    } catch (err) {
        document.getElementById("result").innerHTML = `<div class="result-card"><h3>Error</h3><pre>${err}</pre></div>`;
    }
}
