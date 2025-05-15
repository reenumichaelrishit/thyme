export async function sendPostRequest(url: string, payload: Record<string, unknown>) {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (!response.ok) {
            return {error: data.message || "Request failed", status: response.status};
        }

        return data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {error: error.message, status: 500};
        }
        return {error: "Network error or server unreachable", status: 500};
    }
}