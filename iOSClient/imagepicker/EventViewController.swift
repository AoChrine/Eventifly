//
//  EventViewController.swift
//  imagepicker
//
//  Created by Alexander Ou on 1/21/17.
//  Copyright © 2017 Sara Robinson. All rights reserved.
//

import UIKit
import EventKit
import Firebase
import FirebaseDatabase

let eventStore = EKEventStore()




class EventViewController: UIViewController {
    
    
    //var posts = [Post]()
    var savedEventId: String = ""
    var eventStartTime: String = ""
    var eventEndTime: String = ""
    
    
    @IBOutlet weak var nameLabel: UILabel!
    
    @IBOutlet weak var descriptionLabel: UILabel!
    
    @IBOutlet weak var timeLabel: UILabel!
    
    @IBOutlet weak var locationLabel: UILabel!
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let dbref = FIRDatabase.database().reference().child("myArray")
        
        
       
        
        DispatchQueue.main.asyncAfter(deadline: .now() + .seconds(5), execute: {
            // Put your code which should be executed with a delay here
            
//            dbref.observe(.value, with: { snapshot in
//                print(snapshot.value ?? "no val")
//                self.posts = []
//                if let snapshots = snapshot.children.allObjects as? [FIRDataSnapshot] {
//                    for snap in snapshots {
//                        if let postDict = snap.value as? Dictionary<String, AnyObject> {
//                            let post = Post()
//                            post.setValuesForKeys(postDict)
//                            self.posts.append(post)
//                        }
//                    }
//                }
//                self.nameLabel.text = (self.posts[0].name)
//                let timestr1 = (self.posts[2].time1)
//                let timestr2 = (self.posts[3].time2)
//                let timestr3 = " to "
//                self.timeLabel.text = timestr1 + timestr2 + timestr3
//                self.locationLabel.text = (self.posts[4].location)
//                self.descriptionLabel.text = (self.posts[1].descript)
//                })
//
//            })
        
            
            
            dbref.observe(.value, with: { snapshot in
//                print(snapshot.value ?? "NO VALUES")
//                print("before trying to cast array")
//                print("***************")
//                print(snapshot)
                var jsonres = ""
                for child in snapshot.children {
                    jsonres  = (child as AnyObject).value
                }
                print(jsonres)
            
               let resArray = jsonres.components(separatedBy: "~$~")
                
                
                //print(type(of: jsonres))
                
                
//                for i in 0 ..< resArray.count {
//                    print(resArray[i])
//                }
               
                
                
                self.nameLabel.text = resArray[0]
                let startIndex1 = resArray[2].index(resArray[2].startIndex, offsetBy: 0)
                let endIndex1 = resArray[2].index(resArray[2].startIndex, offsetBy: 15)
                let startIndex2 = resArray[3].index(resArray[3].startIndex, offsetBy: 0)
                let endIndex2 = resArray[3].index(resArray[3].startIndex, offsetBy: 15)
                self.eventStartTime = resArray[2][startIndex1...endIndex1]
                self.eventEndTime = resArray[3][startIndex2...endIndex2]
//                let timestr1 = resArray[2]
//                let timestr2 = resArray[3]
                let timestr3 = " to "
                self.timeLabel.text = self.eventStartTime + timestr3 + self.eventEndTime
                self.locationLabel.text = resArray[4]
                self.descriptionLabel.text = resArray[1]
            })
        })
        
        // Do any additional setup after loading the view.
    }
    
//    class Post: NSObject {
//        var name: String = ""
//        var descript: String = ""
//        var time1: String = ""
//        var time2: String = ""
//        var location: String = ""
//    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    @IBAction func backToMainMenu(_ sender: Any) {
        //performSegue(withIdentifier: "showMainViewController", sender: nil)
    }
    
    @IBAction func AddtoGoogleCalendar(_ sender: Any) {
        
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd'T'HH:mm"
        
        
        let startDate: Date = dateFormatter.date(from: eventStartTime)!
        
        let endDate: Date = dateFormatter.date(from: eventEndTime)!
        let eventTitle: String = self.nameLabel.text!
        
        if(EKEventStore.authorizationStatus(for: .event) != EKAuthorizationStatus.authorized) {
            eventStore.requestAccess(to: .event, completion: { (granted, error) in
                    //code to get permission
                self.createEvent(eventStore: eventStore, title: eventTitle, startDate: startDate, endDate: endDate)
            })
        }else{
            //call create event and add permission
            createEvent(eventStore: eventStore, title: eventTitle, startDate: startDate, endDate: endDate)
            
        }
        
        let signupAlertController = UIAlertController(title: "Event Added", message: "Go check it out in your calendar!", preferredStyle: UIAlertControllerStyle.alert)
        let okAction = UIAlertAction(title: "Back", style: UIAlertActionStyle.default, handler: nil)
        signupAlertController.addAction(okAction)
        self.present(signupAlertController, animated: true, completion: nil)
    }
    
    func createEvent(eventStore: EKEventStore, title: String, startDate: Date, endDate: Date) {
        let event = EKEvent(eventStore: eventStore)
        event.title = title
        event.startDate = startDate as Date
        event.endDate = endDate as Date
        event.calendar = eventStore.defaultCalendarForNewEvents
        do{
            try eventStore.save(event, span: .thisEvent)
            savedEventId = event.eventIdentifier
        }catch{
            print("bad event")
        }
    }

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
