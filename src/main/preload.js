(function() {
    const toDataURL = HTMLCanvasElement.prototype.toDataURL;
    HTMLCanvasElement.prototype.toDataURL = function() {
        const ctx = this.getContext('2d');
        if (ctx) {
            ctx.fillStyle = 'rgba(' + (Math.random()*255) + ',0,0,0.01)';
            ctx.fillRect(0, 0, 1, 1);
        }
        return toDataURL.apply(this, arguments);
    };

    const getParameter = WebGLRenderingContext.prototype.getParameter;
    WebGLRenderingContext.prototype.getParameter = function(param) {
        if (param === 37445) return "Fake-GPU-Renderer";
        if (param === 37446) return "Fake-GPU-Vendor";
        return getParameter.call(this, param);
    };

    Object.defineProperty(navigator, 'platform', { get: () => 'Win32' });
    Object.defineProperty(navigator, 'hardwareConcurrency', { get: () => 8 });
    Object.defineProperty(navigator, 'languages', { get: () => ['en-US','en'] });
    Object.defineProperty(navigator, 'webdriver', { get: () => false });

    Intl.DateTimeFormat = function() {
        return { resolvedOptions: () => ({ timeZone: "Asia/Tokyo" }) };
    };

    console.log("StealthWeb Phase 2 spoof engine active");
})();