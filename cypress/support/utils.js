const firstMiddleNames = [
    "James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "William", "Elizabeth",
    "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen",
    "Christopher", "Nancy", "Daniel", "Lisa", "Matthew", "Betty", "Anthony", "Margaret", "Mark", "Sandra",
    "Donald", "Ashley", "Steven", "Kimberly", "Paul", "Emily", "Andrew", "Donna", "Joshua", "Michelle",
    "Kenneth", "Dorothy", "Kevin", "Carol", "Brian", "Amanda", "George", "Melissa", "Edward", "Deborah",
    "Ronald", "Stephanie", "Timothy", "Rebecca", "Jason", "Sharon", "Jeffrey", "Laura", "Ryan", "Cynthia",
    "Jacob", "Kathleen", "Gary", "Amy", "Nicholas", "Shirley", "Eric", "Angela", "Jonathan", "Helen",
    "Stephen", "Anna", "Larry", "Brenda", "Justin", "Pamela", "Scott", "Nicole", "Brandon", "Emma",
    "Benjamin", "Samantha", "Samuel", "Katherine", "Gregory", "Christine", "Frank", "Debra", "Alexander", "Rachel",
    "Raymond", "Catherine", "Patrick", "Carolyn", "Jack", "Janet", "Dennis", "Ruth", "Jerry", "Maria",
    "Henry", "Heather", "Carl", "Diane", "Arthur", "Julie", "Ryan", "Joyce", "Roger", "Victoria",
    "Joe", "Olivia", "Juan", "Kelly", "Albert", "Christina", "Jonathan", "Lauren", "Terry", "Joan",
    "Gerald", "Evelyn", "Keith", "Judith", "Samuel", "Megan", "Willie", "Cheryl", "Ralph", "Martha",
    "Lawrence", "Andrea", "Nicholas", "Frances", "Roy", "Hannah", "Benjamin", "Jacqueline", "Bruce", "Ann",
    "Brandon", "Gloria", "Adam", "Jean", "Harry", "Kathryn", "Fred", "Alice", "Wayne", "Teresa",
    "Billy", "Sara", "Steve", "Janice", "Louis", "Doris", "Jeremy", "Julia", "Aaron", "Madison",
    "Randy", "Grace", "Howard", "Judy", "Eugene", "Theresa", "Carlos", "Beverly", "Russell", "Denise",
    "Bobby", "Marilyn", "Victor", "Amber", "Martin", "Danielle", "Ernest", "Rose", "Phillip", "Brittany",
    "Todd", "Diana", "Jesse", "Abigail", "Craig", "Natalie", "Alan", "Jane", "Shawn", "Lori",
    "Clarence", "Alexis", "Sean", "Tiffany", "Philip", "Kayla", "Chris", "Charlotte", "Johnny", "Megan"
];

const lastNames = [
    "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
    "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin",
    "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson",
    "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores",
    "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell", "Carter", "Roberts",
    "Gomez", "Phillips", "Evans", "Turner", "Diaz", "Parker", "Cruz", "Edwards", "Collins", "Reyes",
    "Stewart", "Morris", "Morales", "Murphy", "Cook", "Rogers", "Gutierrez", "Ortiz", "Morgan", "Cooper",
    "Peterson", "Bailey", "Reed", "Kelly", "Howard", "Ramos", "Kim", "Cox", "Ward", "Richardson",
    "Watson", "Brooks", "Chavez", "Wood", "James", "Bennett", "Gray", "Mendoza", "Ruiz", "Hughes",
    "Price", "Alvarez", "Castillo", "Sanders", "Patel", "Myers", "Long", "Ross", "Foster", "Jimenez",
    "Powell", "Jenkins", "Perry", "Russell", "Sullivan", "Bell", "Coleman", "Butler", "Henderson", "Barnes",
    "Gonzales", "Fisher", "Vasquez", "Simmons", "Romero", "Jordan", "Patterson", "Alexander", "Hamilton", "Graham",
    "Reynolds", "Griffin", "Wallace", "Moreno", "West", "Cole", "Hayes", "Bryant", "Herrera", "Gibson",
    "Ellis", "Tran", "Medina", "Aguilar", "Stevens", "Murray", "Ford", "Castro", "Marshall", "Owens",
    "Harrison", "Fernandez", "McDonald", "Woods", "Washington", "Kennedy", "Wells", "Vargas", "Henry", "Chen",
    "Freeman", "Webb", "Tucker", "Guzman", "Burns", "Crawford", "Olson", "Simpson", "Porter", "Hunter",
    "Gordon", "Mendez", "Silva", "Shaw", "Snyder", "Mason", "Dixon", "Munoz", "Hunt", "Hicks",
    "Holmes", "Palmer", "Wagner", "Black", "Robertson", "Boyd", "Rose", "Stone", "Salazar", "Fox"
];

function getRandomFirstMiddleName() {
    const randomIndex = Math.floor(Math.random() * firstMiddleNames.length);
    return firstMiddleNames[randomIndex];
}

function getRandomLastName() {
    const randomIndex = Math.floor(Math.random() * lastNames.length);
    return lastNames[randomIndex];
}

function getRandomFullName() {
    return {
        firstName: getRandomFirstMiddleName(),
        middleName: getRandomFirstMiddleName(),
        lastName: getRandomLastName()
    };
}

function getRandomEmployeeId() {
    return Math.floor(Math.random() * 1000000).toString();
}

module.exports = {getRandomFullName, getRandomEmployeeId};