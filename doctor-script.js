document.addEventListener('DOMContentLoaded', function() {
    // Sample data for appointments
    const appointments = [
        {
            patientName: 'Ionescu Maria',
            date: '2025-04-10',
            time: '10:00',
            reason: 'Consultație cardiologică'
        },
        {
            patientName: 'Popa Alexandru',
            date: '2025-04-11',
            time: '14:30',
            reason: 'Control periodic'
        },
        {
            patientName: 'Dumitrescu Elena',
            date: '2025-04-12',
            time: '09:15',
            reason: 'Ecografie cardiacă'
        }
    ];

    // Function to format date
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('ro-RO', options);
    }

    // Populate appointments
    const appointmentList = document.getElementById('appointment-list');
    
    if (appointmentList) {
        appointments.forEach(appointment => {
            const appointmentItem = document.createElement('div');
            appointmentItem.className = 'appointment-item';
            appointmentItem.innerHTML = `
                <div class="appointment-header">
                    <h3>${appointment.patientName}</h3>
                    <span class="appointment-date">${formatDate(appointment.date)} | ${appointment.time}</span>
                </div>
                <p class="appointment-reason">${appointment.reason}</p>
                <div class="appointment-actions">
                    <button class="btn-confirm">Confirmă</button>
                    <button class="btn-reschedule">Reprogramează</button>
                    <button class="btn-cancel">Anulează</button>
                </div>
            `;
            appointmentList.appendChild(appointmentItem);
        });
    }

    // Make form fields editable
    const editableInputs = document.querySelectorAll('#clinica, #experienta, #specializare, #email-contact, #program');
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

    // Add announcement button
    const addButton = document.querySelector('.add-button');
    if (addButton) {
        addButton.addEventListener('click', function() {
            alert('Funcționalitate de adăugare anunț');
        });
    }

    // Add styles for appointment items
    const style = document.createElement('style');
    style.textContent = `
        .appointment-item {
            background-color: var(--light-gray);
            border-radius: 5px;
            padding: 15px;
        }
        
        .appointment-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }
        
        .appointment-date {
            font-size: 0.9rem;
            color: var(--dark-gray);
        }
        
        .appointment-reason {
            margin-bottom: 15px;
        }
        
        .appointment-actions {
            display: flex;
            gap: 10px;
        }
        
        .appointment-actions button {
            padding: 8px 12px;
            border-radius: 5px;
            border: none;
            cursor: pointer;
            font-weight: 500;
        }
        
        .btn-confirm {
            background-color: var(--primary-color);
            color: white;
        }
        
        .btn-reschedule {
            background-color: #FFD700;
            color: var(--text-color);
        }
        
        .btn-cancel {
            background-color: #FF6B6B;
            color: white;
        }
    `;
    document.head.appendChild(style);
});