#import "AppDelegate.h"
#import <UserNotifications/UserNotifications.h>
#import <React/RCTLinkingManager.h>
//#import <RNCPushNotificationIOS.h> // Uncomment if using push notifications
#import <React/RCTBundleURLProvider.h>
#import "RNNotifications.h"
@implementation AppDelegate
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    [RNNotifications startMonitorNotifications]; // -> Add this line

    return YES;
}
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
  [RNNotifications didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error {
  [RNNotifications didFailToRegisterForRemoteNotificationsWithError:error];
}
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult result))completionHandler {
  [RNNotifications didReceiveBackgroundNotification:userInfo withCompletionHandler:completionHandler];
}
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  // Set up push notification handling if needed
//  [RNCPushNotificationIOS didFinishLaunchingWithOptions:launchOptions];
  
  // Configure React Native
  self.moduleName = @"YCstartupTask"; // Ensure this matches your app's module name
  self.initialProps = @{};
  
  // Ensure to return YES to indicate successful launch
  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
