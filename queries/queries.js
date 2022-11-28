const getAllLaureates = "SELECT * FROM LAUREATES ORDER BY id_laureate ASC"
const getAllLaureatesById = "SELECT firstname, surname, annee, nom_category, motivation FROM LAUREATES INNER JOIN remporte r on LAUREATES.id_laureate = r.id_laureate INNER JOIN PRIZES P on P.id_prize = r.id_prize INNER JOIN CATEGORY C on C.id_category = P.id_category WHERE r.id_laureate = $1;"

module.exports = {
    getAllLaureates,
    getAllLaureatesById
}