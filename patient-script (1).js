document.addEventListener('DOMContentLoaded', function() {
    // Sample data for appointment history
    const appointmentHistory = [
        {
            doctorName: 'Dr. Popescu Ana',
            specialization: 'Cardiologie',
            clinic: 'ClinicaMed',
            address: 'Str. Medicilor Nr. 10',
            date: '2025-03-15'
        },
        {
            doctorName: 'Dr. Ionescu Mihai',
            specialization: 'Neurologie',
            clinic: 'SpitalulCentral',
            address: 'Str. Sănătății Nr. 5',
            date: '2025-02-20'
        },
        {
            doctorName: 'Dr. Georgescu Elena',
            specialization: 'Oftalmologie',
            clinic: 'VizioClinic',
            address: 'Str. Luminii Nr. 8',
            date: '2025-01-10'
        }
    ];

    // Function to format date
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('ro-RO', options);
    }

    // Populate appointment history
    const appointmentHistoryList = document.getElementById('appointment-history-list');
    
    if (appointmentHistoryList) {
        // Clear existing content
        appointmentHistoryList.innerHTML = '';
        
        appointmentHistory.forEach(appointment => {
            const appointmentItem = document.createElement('div');
            appointmentItem.className = 'appointment-history-item';
            appointmentItem.innerHTML = `
                <div class="doctor-info">
                    <div class="doctor-avatar">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="20" cy="20" r="19.5" fill="white" stroke="#2EDBBA"/>
                            <path d="M20 20C23.3137 20 26 17.3137 26 14C26 10.6863 23.3137 8 20 8C16.6863 8 14 10.6863 14 14C14 17.3137 16.6863 20 20 20Z" fill="#E6E6E6"/>
                            <path d="M20 22C14.477 22 10 26.477 10 32H30C30 26.477 25.523 22 20 22Z" fill="#E6E6E6"/>
                        </svg>
                    </div>
                    <div class="doctor-details">
                        <h3>${appointment.doctorName}</h3>
                        <p>${appointment.specialization}</p>
                        <p class="appointment-date">${formatDate(appointment.date)}</p>
                    </div>
                </div>
                <div class="appointment-location">
                    <p>${appointment.clinic} - ${appointment.address}</p>
                </div>
            `;
            appointmentHistoryList.appendChild(appointmentItem);
        });
    }

    // Make form fields editable
    const editableInputs = document.querySelectorAll('#data-nasterii, #cnp, #alergii, #boli-cronice');
    editableInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.select();
        });
    });

    // Profile image edit button
    const editButton = document.querySelector('.edit-button');
    if (editButton) {
        editButton.addEventListener('click', function() {
            // In a real application, this would open a file picker
            alert('Funcționalitate de schimbare a imaginii de profil');
        });
    }

    // Add appointment button
    const addButton = document.querySelector('.add-button');
    if (addButton) {
        addButton.addEventListener('click', function() {
            alert('Funcționalitate de adăugare programare');
        });
    }

    // Add styles for appointment history items
    const style = document.createElement('style');
    style.textContent = `
        .appointment-date {
            font-size: 0.8rem;
            color: var(--dark-gray);
            margin-top: 5px;
        }
        
        .appointment-history-item {
            transition: background-color 0.3s;
        }
        
        .appointment-history-item:hover {
            background-color: #E8F5F1;
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);
});