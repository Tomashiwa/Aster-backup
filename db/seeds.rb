User.create!(name:"superuser");

Board.create!(user_id: 1, name: "default");

List.create!(board_id: 1, name: "Backlog");
List.create!(board_id: 1, name: "To-do");
List.create!(board_id: 1, name: "In progress");
List.create!(board_id: 1, name: "Completed");

Tag.create!(name: "None")
Tag.create!(name: "Red")
Tag.create!(name: "Yellow")
Tag.create!(name: "Green")
Tag.create!(name: "Blue")
Tag.create!(name: "Pink")

Task.create!(list_id: 1, title: "Johnny Joestar", description: "A former horse-racing prodigy turned paraplegic, Johnny joins the SBR race to find out the secret behind Gyro Zeppeli's Steel Balls as they're the only thing capable of healing his legs.", tag_id: 1, due_date: Time.now.utc)
Task.create!(list_id: 2, title: "Kishibe Rohan", description: "A successful professional mangaka, Rohan is often roped into paranormal events while conducting research for his latest manga. He is a Stand User who uses his Stand, Heaven's Door, to transform others into books and read them for inspiration.", tag_id: 2, due_date: Time.now.utc)
Task.create!(list_id: 3, title: "Diego Brando", description: "Diego Brando is a genius British jockey hailed as one of the best contenders in the Steel Ball Run race, but he soon shifts his attention to the Saint's Corpse. Diego becomes a powerful intermittent rival to both Gyro and Johnny.", tag_id: 3, due_date: Time.now.utc)
Task.create!(list_id: 4, title: "Jolyne Kujo", description: "Jolyne is the only female JoJo to date, and the daughter of Jotaro Kujo. Framed for a DUIW murder, she is sent to Green Dolphin Street Prison, where she investigates and battles DIO's most trusted disciple, Father Enrico Pucci.", tag_id: 4, due_date: Time.now.utc)

puts "Completed Seeding"