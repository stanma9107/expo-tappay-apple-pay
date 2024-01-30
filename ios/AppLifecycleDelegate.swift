import ExpoModulesCore
import TPDirect

public class AppLifecycleDelegate: ExpoAppDelegateSubscriber {
    public func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
        // TODO: Get App ID, App Key and ServerType
        let appId = Bundle.main.object(forInfoDictionaryKey: "TPDAppId") as? Int32 ?? 0
        let appKey = Bundle.main.object(forInfoDictionaryKey: "TPDAppKey") as? String ?? ""
        let serverType = Bundle.main.object(forInfoDictionaryKey: "TPDServerType") as? String ?? "sandbox"
        
        let TPDServerType = serverType == "sandbox" ? TPDServerType.sandBox : TPDServerType.production
        
        TPDSetup.setWithAppId(appId, withAppKey: appKey, with: TPDServerType)
        return true
    }
    public func applicationDidBecomeActive(_ application: UIApplication) {
        // The app has become active.
    }

    public func applicationWillResignActive(_ application: UIApplication) {
        // The app is about to become inactive.
    }

    public func applicationDidEnterBackground(_ application: UIApplication) {
        // The app is now in the background.
    }

    public func applicationWillEnterForeground(_ application: UIApplication) {
        // The app is about to enter the foreground.
    }

    public func applicationWillTerminate(_ application: UIApplication) {
        // The app is about to terminate.
    }
}
