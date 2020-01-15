User.create!(name: "superuser", password: "superpass", password_confirmation: "superpass", admin: true)
User.create!(name: "user", password: "pass", password_confirmation: "pass", admin: false)
# User.create!(name:"Matsuoka Tamotsu", password: "123");
# User.create!(name:"Noguchi Cho", password: "456");
# User.create!(name:"Nakamoto Kyoko", password: "789");
# User.create!(name:"Okimoto Haru", password: "012");
# User.create!(name:"Kaya Yoshiyuki", password: "345");
# User.create!(name:"Nii Shigeru", password: "678");

Board.create!(user_id: 1, name: "default");

List.create!(board_id: 1, name: "Backlog");
List.create!(board_id: 1, name: "To-do");
List.create!(board_id: 1, name: "In progress");
List.create!(board_id: 1, name: "Completed");

Tag.create!(name: "NIL")
Tag.create!(name: "Red")
Tag.create!(name: "Yellow")
Tag.create!(name: "Green")
Tag.create!(name: "Blue")
Tag.create!(name: "Pink")

Task.create!(list_id: 1, title: "Johnny Joestar", description: "A former horse-racing prodigy turned paraplegic, Johnny joins the SBR race to find out the secret behind Gyro Zeppeli's Steel Balls as they're the only thing capable of healing his legs.", tag_id: 1, due_date: Time.now.utc, participants: [])
Task.create!(list_id: 2, title: "Kishibe Rohan", description: "A successful professional mangaka, Rohan is often roped into paranormal events while conducting research for his latest manga. He is a Stand User who uses his Stand, Heaven's Door, to transform others into books and read them for inspiration.", tag_id: 2, due_date: Time.now.utc, participants: [])
Task.create!(list_id: 3, title: "Diego Brando", description: "Diego Brando is a genius British jockey hailed as one of the best contenders in the Steel Ball Run race, but he soon shifts his attention to the Saint's Corpse. Diego becomes a powerful intermittent rival to both Gyro and Johnny.", tag_id: 3, due_date: Time.now.utc, participants: [])
Task.create!(list_id: 4, title: "Jolyne Kujo", description: "Jolyne is the only female JoJo to date, and the daughter of Jotaro Kujo. Framed for a DUIW murder, she is sent to Green Dolphin Street Prison, where she investigates and battles DIO's most trusted disciple, Father Enrico Pucci.", tag_id: 4, due_date: Time.now.utc, participants: [])

# Comment.create!(user_id: 1, task_id: 1, body: "ACT1 is awakened in the Devil's Palm when the corpse part combines itself with Johnny's left hand, manifesting his Stand with the ability to spin his nails and fire them akin to bullets, and regrowing his nails in seconds.");
# Comment.create!(user_id: 2, task_id: 1, body: "ACT2 manifests when Johnny shoots a nail whilst incorporating the Golden Rectangle in a fight against Sandman. Despite the longer regrow time, the nails possess more power and a new ability that lets the holes of the bullets follow the target for a small amount of time");
# Comment.create!(user_id: 3, task_id: 1, body: "ACT3 is the final base form for Tusk and manifests when Johnny shoots himself with a Golden Rectangle-empowered nail, enabling him to transfer parts of his body through the holes to shoot from different directions. It was awakened by an advice from Jesus in a fight against Axl RO.");
# Comment.create!(user_id: 2, task_id: 1, body: "ACT4 manifests itself as a result of Johnny utilizing Slow Dancer's power combined with the golden rectangle, which enables Johnny to fire Golden Spin nail-bullets that have infinite rotation. ACT4 possesses the power to force open D4C Love Train's dimensional wall, and trap anyone hit by it to a single spot indefinitely.");
# Comment.create!(user_id: 4, task_id: 1, body: "ACT1 is awakened in the Devil's Palm when the corpse part combines itself with Johnny's left hand, manifesting his Stand with the ability to spin his nails and fire them akin to bullets, and regrowing his nails in seconds.");
# Comment.create!(user_id: 5, task_id: 1, body: "ACT2 manifests when Johnny shoots a nail whilst incorporating the Golden Rectangle in a fight against Sandman. Despite the longer regrow time, the nails possess more power and a new ability that lets the holes of the bullets follow the target for a small amount of time");
# Comment.create!(user_id: 6, task_id: 1, body: "ACT3 is the final base form for Tusk and manifests when Johnny shoots himself with a Golden Rectangle-empowered nail, enabling him to transfer parts of his body through the holes to shoot from different directions. It was awakened by an advice from Jesus in a fight against Axl RO.");
# Comment.create!(user_id: 6, task_id: 1, body: "ACT4 manifests itself as a result of Johnny utilizing Slow Dancer's power combined with the golden rectangle, which enables Johnny to fire Golden Spin nail-bullets that have infinite rotation. ACT4 possesses the power to force open D4C Love Train's dimensional wall, and trap anyone hit by it to a single spot indefinitely.");
# Comment.create!(user_id: 1, task_id: 1, body: "ACT1 is awakened in the Devil's Palm when the corpse part combines itself with Johnny's left hand, manifesting his Stand with the ability to spin his nails and fire them akin to bullets, and regrowing his nails in seconds.");
# Comment.create!(user_id: 2, task_id: 1, body: "ACT2 manifests when Johnny shoots a nail whilst incorporating the Golden Rectangle in a fight against Sandman. Despite the longer regrow time, the nails possess more power and a new ability that lets the holes of the bullets follow the target for a small amount of time");
# Comment.create!(user_id: 3, task_id: 1, body: "ACT3 is the final base form for Tusk and manifests when Johnny shoots himself with a Golden Rectangle-empowered nail, enabling him to transfer parts of his body through the holes to shoot from different directions. It was awakened by an advice from Jesus in a fight against Axl RO.");
# Comment.create!(user_id: 2, task_id: 1, body: "ACT4 manifests itself as a result of Johnny utilizing Slow Dancer's power combined with the golden rectangle, which enables Johnny to fire Golden Spin nail-bullets that have infinite rotation. ACT4 possesses the power to force open D4C Love Train's dimensional wall, and trap anyone hit by it to a single spot indefinitely.");
# Comment.create!(user_id: 4, task_id: 1, body: "ACT1 is awakened in the Devil's Palm when the corpse part combines itself with Johnny's left hand, manifesting his Stand with the ability to spin his nails and fire them akin to bullets, and regrowing his nails in seconds.");
# Comment.create!(user_id: 5, task_id: 1, body: "ACT2 manifests when Johnny shoots a nail whilst incorporating the Golden Rectangle in a fight against Sandman. Despite the longer regrow time, the nails possess more power and a new ability that lets the holes of the bullets follow the target for a small amount of time");
# Comment.create!(user_id: 6, task_id: 1, body: "ACT3 is the final base form for Tusk and manifests when Johnny shoots himself with a Golden Rectangle-empowered nail, enabling him to transfer parts of his body through the holes to shoot from different directions. It was awakened by an advice from Jesus in a fight against Axl RO.");
# Comment.create!(user_id: 6, task_id: 1, body: "ACT4 manifests itself as a result of Johnny utilizing Slow Dancer's power combined with the golden rectangle, which enables Johnny to fire Golden Spin nail-bullets that have infinite rotation. ACT4 possesses the power to force open D4C Love Train's dimensional wall, and trap anyone hit by it to a single spot indefinitely.");

puts "Completed Seeding"