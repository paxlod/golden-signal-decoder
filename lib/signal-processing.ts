// signal-processing.ts

/**
 * Normalizes a signal to a range of -1 to 1.
 * @param {number[]} signal - Input signal array.
 * @returns {number[]} - Normalized signal.
 */
function normalize(signal) {
    const max = Math.max(...signal);
    const min = Math.min(...signal);
    return signal.map(value => (value - min) / (max - min) * 2 - 1);
}

/**
 * Finds peaks in a signal based on a threshold.
 * @param {number[]} signal - Input signal array.
 * @param {number} threshold - Minimum value to identify a peak.
 * @returns {number[]} - Indices of peaks.
 */
function findPeaks(signal, threshold) {
    const peaks = [];
    for (let i = 1; i < signal.length - 1; i++) {
        if (signal[i] > signal[i - 1] && signal[i] > signal[i + 1] && signal[i] > threshold) {
            peaks.push(i);
        }
    }
    return peaks;
}

/**
 * Computes the autocorrelation of a signal.
 * @param {number[]} signal - Input signal array.
 * @returns {number[]} - Autocorrelation array.
 */
function autocorrelation(signal) {
    const N = signal.length;
    const result = new Array(N).fill(0);
    for (let lag = 0; lag < N; lag++) {
        for (let i = 0; i < N - lag; i++) {
            result[lag] += signal[i] * signal[i + lag];
        }
    }
    return result;
}

/**
 * Computes the Discrete Fourier Transform (DFT) of a signal.
 * @param {number[]} signal - Input signal array.
 * @returns {Complex[]} - DFT result as complex numbers.
 */
function DFT(signal) {
    const N = signal.length;
    const output = new Array(N);
    for (let k = 0; k < N; k++) {
        let real = 0;
        let imag = 0;
        for (let n = 0; n < N; n++) {
            const theta = (2 * Math.PI * n * k) / N;
            real += signal[n] * Math.cos(theta);
            imag -= signal[n] * Math.sin(theta);
        }
        output[k] = { real, imag };
    }
    return output;
}

/**
 * Generates a spectrogram of a signal.
 * @param {number[]} signal - Input signal array.
 * @param {number} windowSize - Size of the window for FFT.
 * @returns {number[][]} - Spectrogram as a 2D array.
 */
function spectrogram(signal, windowSize) {
    const spec = [];
    for (let i = 0; i <= signal.length - windowSize; i += windowSize) {
        const windowedSignal = signal.slice(i, i + windowSize);
        const dft = DFT(windowedSignal);
        spec.push(dft);
    }
    return spec;
}

/**
 * Decodes an encoded image signal.
 * @param {string} encoded - The encoded image string.
 * @returns {ImageData} - Decoded image data.
 */
function imageDecoding(encoded) {
    const binaryString = atob(encoded);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    // Assuming a fixed width for demonstration purposes
    const width = 256;
    const height = len / width;
    return new ImageData(bytes, width, height);
}

/**
 * Detects patterns in a signal.
 * @param {number[]} signal - Input signal array.
 * @param {number[]} pattern - Pattern to detect.
 * @returns {number[]} - Starting indices of detected patterns.
 */
function patternDetection(signal, pattern) {
    const indices = [];
    for (let i = 0; i <= signal.length - pattern.length; i++) {
        if (signal.slice(i, i + pattern.length).every((val, idx) => val === pattern[idx])) {
            indices.push(i);
        }
    }
    return indices;
}

/**
 * Analyzes a signal and extracts features.
 * @param {number[]} signal - Input signal array.
 * @returns {Object} - Analysis results including peaks and stats.
 */
function signalAnalysis(signal) {
    const mean = signal.reduce((sum, value) => sum + value, 0) / signal.length;
    const peaks = findPeaks(signal, mean);
    return { mean, peaks };
}