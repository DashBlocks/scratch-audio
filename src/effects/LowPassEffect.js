const Effect = require('./Effect');

/**
 * A low pass filter effect, which cutoff frequency of the sound
 */
class LowPassEffect extends Effect {
    /**
     * Return the name of the effect.
     * @type {string}
     */
    get name () {
        return 'lowpass';
    }

    /**
     * Initialize the Effect.
     * Effects start out uninitialized. Then initialize when they are first set
     * with some value.
     * @throws {Error} throws when left unimplemented
     */
    initialize () {
        const audioContext = this.audioEngine.audioContext;

        this.inputNode = audioContext.createBiquadFilter();
        this.outputNode = audioContext.createGain();

        this.inputNode.type = 'lowpass';
        this.inputNode.frequency.value = this.inputNode.frequency.max;
        this.inputNode.connect(this.outputNode);

        this.initialized = true;
    }

    /**
     * Set the effect value
     * @param {number} value - the new value to set the effect to
     */
    _set (value) {
        this.value = value;
        this.inputNode.frequency.value = value;
    }

    /**
     * Clean up and disconnect audio nodes.
     */
    dispose () {
        if (!this.initialized) {
            return;
        }

        this.inputNode.disconnect();

        this.inputNode = null;
        this.outputNode = null;
        this.target = null;

        this.initialized = false;
    }
}

module.exports = LowPassEffect;
