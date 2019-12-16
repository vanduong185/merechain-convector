# create admin for 2 org Bach Mai and Viet Duc
hurl invoke merechain participant_register admin-bachmai "Admin Bach Mai" admin -u user1 -o org1
wait
hurl invoke merechain participant_register admin-vietduc "Admin Viet Duc" admin -u user1 -o org2
wait

# create practitioners
hurl invoke merechain practitioner_create '{"id": "prac1", "name": "Dr.Ann", "email": "prac1@bachmai.org", "password": "mypassword", "workplace": "Khoa Da Lieu - Bach Mai"}' -u user1 -o org1
wait 
hurl invoke merechain practitioner_create '{"id": "prac2", "name": "Dr.Thanh", "email": "prac2@bachmai.org", "password": "mypassword", "workplace": "Khoa XYZ - Bach Mai"}' -u user1 -o org1
wait
hurl invoke merechain practitioner_create '{"id": "prac3", "name": "Dr.Jenifer", "email": "prac3@vietduc.org", "password": "mypassword", "workplace": "Khoa RHM - Viet Duc"}' -u user1 -o org2 
wait
hurl invoke merechain practitioner_create '{"id": "prac4", "name": "Dr.Tung", "email": "prac4@vietduc.org", "password": "mypassword", "workplace": "Khoa TMH - Viet Duc"}' -u user1 -o org2 
wait

# create patients
hurl invoke merechain patient_create '{"id": "pat1", "name": "Nguyen Van A", "email": "pat1@example.com", "password": "mypassword", "birthyear": 1998, "address": "Hanoi"}' -u user1 -o org1
wait
hurl invoke merechain patient_create '{"id": "pat2", "name": "Nguyen Van B", "email": "pat2@example.com", "password": "mypassword", "birthyear": 1999, "address": "Haiphong"}' -u user1 -o org2

echo "Seed provisioned"
