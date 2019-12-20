puts "DT: " + Time.now.utc.iso8601
Task.create!(list_id: nil, title: "Task 1", description: "Daiya Sotaro", tag: "FDJ", due_date: Time.now.utc.iso8601)
Task.create!(list_id: nil, title: "Task 2", description: "Mirai Sena", tag: "AEL", due_date: Time.now.utc.iso8601)
puts "data loaded success"