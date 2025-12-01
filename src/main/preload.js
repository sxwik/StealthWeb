// keeps Phase 2 spoofing
(() => {
    const toDataURL = HTMLCanvasElement.prototype.toDataURL;
    HTMLCanvasElement.prototype.toDataURL = function() {
        const ctx = this.getContext('2d');
        if(ctx){ ctx.fillStyle='rgba(255,0,0,0.01)'; ctx.fillRect(0,0,1,1); }
        return toDataURL.apply(this, arguments);
    };
})();
