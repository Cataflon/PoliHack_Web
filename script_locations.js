document.addEventListener('DOMContentLoaded', function() {
    // Count the number of location pins in the image (approximately 10)
    const locationCount = 10;
    document.getElementById('location-count').textContent = locationCount;
    
    // Find nearest location button functionality
    const findLocationBtn = document.getElementById('find-location');
    findLocationBtn.addEventListener('click', function() {
        // In a real application, this would use geolocation
        // For this demo, we'll just show an alert
        alert('Finding your nearest HEAL location...\n\nNearest location: HEAL Cluj-Napoca Central\nDistance: 1.2 km\nAddress: Strada Memorandumului 28\nOpen: 24/7');
    });
    
    // Add a simple hover effect for the map
    const mapOverlay = document.getElementById('map-overlay');
    const mapContainer = document.querySelector('.map-container');
    
    mapContainer.addEventListener('mouseover', function() {
        mapOverlay.style.backgroundColor = 'rgba(230, 57, 70, 0.1)';
    });
    
    mapContainer.addEventListener('mouseout', function() {
        mapOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    });
    
    // Simple animation for stats
    const stats = document.querySelectorAll('.stat-number');
    
    // Animate the stats when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    entry.target.style.transform = 'scale(1)';
                }, 300);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => {
        observer.observe(stat);
        stat.style.transition = 'transform 0.3s ease';
    });
});