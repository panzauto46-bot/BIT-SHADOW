// Simple AES-GCM encryption for metadata
// In a real app, 'key' would be derived from a signature or shared secret (ECDH)

export async function generateKey(): Promise<CryptoKey> {
    return window.crypto.subtle.generateKey(
        {
            name: "AES-GCM",
            length: 256
        },
        true,
        ["encrypt", "decrypt"]
    );
}

export async function encryptData(data: string, key: CryptoKey): Promise<{ cipherText: string; iv: string }> {
    const encoder = new TextEncoder();
    const encodedData = encoder.encode(data);
    const iv = window.crypto.getRandomValues(new Uint8Array(12));

    const encrypted = await window.crypto.subtle.encrypt(
        {
            name: "AES-GCM",
            iv: iv
        },
        key,
        encodedData
    );

    return {
        cipherText: arrayBufferToBase64(encrypted),
        iv: arrayBufferToBase64(iv.buffer as ArrayBuffer)
    };
}

export async function decryptData(cipherText: string, iv: string, key: CryptoKey): Promise<string> {
    const decoder = new TextDecoder();
    const encryptedData = base64ToArrayBuffer(cipherText);
    const ivData = base64ToArrayBuffer(iv);

    const decrypted = await window.crypto.subtle.decrypt(
        {
            name: "AES-GCM",
            iv: new Uint8Array(ivData)
        },
        key,
        encryptedData
    );

    return decoder.decode(decrypted);
}

// Helpers
function arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

function base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binary_string = window.atob(base64);
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}
