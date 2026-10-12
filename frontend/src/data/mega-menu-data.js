export const MEGA_MENU_DATA = {
  Laptop: {
    columns: [
      {
        title: "By Brand",
        items: [
          { label: "All Laptops", href: "/category/laptops" },
          { label: "ASUS Laptop", href: "/shop?brand=ASUS", hasSub: true },
          { label: "Lenovo Laptop", href: "/shop?brand=Lenovo", hasSub: true },
          { label: "HP Laptop", href: "/shop?brand=HP", hasSub: true },
          { label: "Dell Laptop", href: "/shop?brand=Dell", hasSub: true },
          { label: "Acer Laptop", href: "/shop?brand=Acer", hasSub: true },
          { label: "Apple MacBook", href: "/shop?brand=Apple", hasSub: true },
          { label: "MSI Laptop", href: "/shop?brand=MSI", hasSub: true },
          { label: "Microsoft Surface", href: "/shop?brand=Microsoft" },
        ],
      },
      {
        title: "By Category",
        items: [
          { label: "Gaming Laptop", href: "/category/laptops?type=gaming", hasSub: true },
          { label: "Premium Ultrabook", href: "/category/laptops?type=ultrabook", hasSub: true },
          { label: "Business Laptop", href: "/category/laptops?type=business" },
          { label: "Student Laptop", href: "/category/laptops?type=student" },
          { label: "OLED Laptop", href: "/category/laptops?screen=oled" },
          { label: "Touchscreen Laptop", href: "/category/laptops?feature=touch" },
          { label: "Budget Laptop", href: "/category/laptops?price=budget" },
        ],
      },
      {
        title: "Accessories & Bags",
        items: [
          { label: "Laptop Backpack", href: "/shop?category=bag", hasSub: true },
          { label: "Laptop Cooling Pad", href: "/shop?category=cooler" },
          { label: "Laptop RAM", href: "/shop?category=ram" },
          { label: "Laptop NVMe SSD", href: "/shop?category=ssd" },
          { label: "Laptop Adapter & Charger", href: "/shop?category=charger" },
          { label: "Screen Protector & Skin", href: "/shop?category=accessories" },
        ],
      },
    ],
  },
  Desktop: {
    columns: [
      {
        title: "PC Types",
        items: [
          { label: "All Desktop PCs", href: "/category/desktops" },
          { label: "Custom Gaming PC", href: "/category/desktops?type=gaming", hasSub: true },
          { label: "Budget PC Builds", href: "/category/desktops?type=budget", hasSub: true },
          { label: "Brand Desktop PC", href: "/category/desktops?type=brand", hasSub: true },
          { label: "All-in-One PC", href: "/category/desktops?type=aio", hasSub: true },
          { label: "Workstation PC", href: "/category/desktops?type=workstation" },
          { label: "Mini PC", href: "/category/desktops?type=mini" },
          { label: "Apple Mac Mini & Studio", href: "/shop?brand=Apple" },
        ],
      },
      {
        title: "Brand PCs",
        items: [
          { label: "ASUS Desktop PC", href: "/shop?brand=ASUS" },
          { label: "HP Desktop PC", href: "/shop?brand=HP" },
          { label: "Dell Desktop PC", href: "/shop?brand=Dell" },
          { label: "Lenovo Desktop PC", href: "/shop?brand=Lenovo" },
          { label: "Acer Desktop PC", href: "/shop?brand=Acer" },
        ],
      },
      {
        title: "Processor Tier",
        items: [
          { label: "Intel Core i3 Desktop", href: "/shop?cpu=i3" },
          { label: "Intel Core i5 Desktop", href: "/shop?cpu=i5" },
          { label: "Intel Core i7/i9 Desktop", href: "/shop?cpu=i7" },
          { label: "AMD Ryzen 5 Desktop", href: "/shop?cpu=r5" },
          { label: "AMD Ryzen 7/9 Desktop", href: "/shop?cpu=r7" },
        ],
      },
    ],
  },
  Components: {
    columns: [
      {
        title: "Core Hardware",
        items: [
          { label: "Processor (CPU)", href: "/shop?category=processor", hasSub: true },
          { label: "Motherboard", href: "/shop?category=motherboard", hasSub: true },
          { label: "Graphics Card (GPU)", href: "/shop?category=gpu", hasSub: true },
          { label: "Desktop RAM", href: "/shop?category=ram", hasSub: true },
          { label: "Laptop RAM", href: "/shop?category=ram" },
          { label: "CPU Air Cooler", href: "/shop?category=cooler", hasSub: true },
          { label: "Liquid Cooler (AIO)", href: "/shop?category=aio-cooler" },
        ],
      },
      {
        title: "Storage & Power",
        items: [
          { label: "SSD (NVMe / SATA)", href: "/shop?category=ssd", hasSub: true },
          { label: "Hard Disk Drive (HDD)", href: "/shop?category=hdd", hasSub: true },
          { label: "Power Supply (PSU)", href: "/shop?category=psu", hasSub: true },
          { label: "Computer Casing", href: "/shop?category=casing", hasSub: true },
          { label: "RGB Casing Fans", href: "/shop?category=fans" },
        ],
      },
      {
        title: "Accessories & Tools",
        items: [
          { label: "Thermal Paste", href: "/shop?category=thermal-paste" },
          { label: "Dedicated Sound Card", href: "/shop?category=sound-card" },
          { label: "Capture Card", href: "/shop?category=capture-card" },
          { label: "PCIe Riser & Cables", href: "/shop?category=cables" },
          { label: "DVD / Optical Drive", href: "/shop?category=odd" },
        ],
      },
    ],
  },
  Accessories: {
    columns: [
      {
        title: "",
        items: [
          { label: "Headphone & Headsets", href: "/shop?category=headphone", hasSub: true },
          { label: "Mouse", href: "/shop?category=mouse", hasSub: true },
          { label: "Keyboard", href: "/shop?category=keyboard", hasSub: true },
          { label: "WebCam", href: "/shop?category=webcam", hasSub: true },
          { label: "Microphone", href: "/shop?category=microphone", hasSub: true },
          { label: "Mouse pad", href: "/shop?category=mousepad", hasSub: true },
          { label: "Gamepad", href: "/shop?category=gamepad", hasSub: true },
          { label: "Pen Drive", href: "/shop?category=pendrive", hasSub: true },
          { label: "Memory Card", href: "/shop?category=memorycard" },
        ],
      },
      {
        title: "",
        items: [
          { label: "Power Bank", href: "/shop?category=powerbank", hasSub: true },
          { label: "Thermal Paste", href: "/shop?category=thermalpaste", hasSub: true },
          { label: "Capture Card", href: "/shop?category=capturecard", hasSub: true },
          { label: "Power Strip", href: "/shop?category=powerstrip", hasSub: true },
          { label: "Presenter", href: "/shop?category=presenter", hasSub: true },
          { label: "Hubs & Docks", href: "/shop?category=hubs", hasSub: true },
          { label: "Drive & Enclosures", href: "/shop?category=enclosures", hasSub: true },
          { label: "Wrist Pad", href: "/shop?category=wristpad" },
          { label: "Keycaps", href: "/shop?category=keycaps" },
        ],
      },
      {
        title: "",
        items: [
          { label: "Cable", href: "/shop?category=cable", hasSub: true },
          { label: "Converter", href: "/shop?category=converter", hasSub: true },
          { label: "Accessories Combo", href: "/shop?category=combo", hasSub: true },
          { label: "Bluetooth Receiver", href: "/shop?category=bluetooth" },
          { label: "RGB Strip & Controller", href: "/shop?category=rgb" },
          { label: "VGA Holder & Mounts", href: "/shop?category=vgaholder" },
          { label: "Mouse Bungee", href: "/shop?category=bungee" },
          { label: "Console Converter", href: "/shop?category=consoleconverter" },
          { label: "Card Reader", href: "/shop?category=cardreader" },
        ],
      },
    ],
  },
  "Phone & Tab": {
    columns: [
      {
        title: "Tablets",
        items: [
          { label: "Apple iPad", href: "/shop?brand=Apple", hasSub: true },
          { label: "Samsung Galaxy Tab", href: "/shop?brand=Samsung", hasSub: true },
          { label: "Xiaomi Pad", href: "/shop?brand=Xiaomi" },
          { label: "Graphics Drawing Tablet", href: "/shop?category=graphics-tablet", hasSub: true },
          { label: "Kids Educational Tablet", href: "/shop?category=tablet" },
        ],
      },
      {
        title: "Smartphones",
        items: [
          { label: "Apple iPhone", href: "/shop?brand=Apple", hasSub: true },
          { label: "Samsung Galaxy Phones", href: "/shop?brand=Samsung", hasSub: true },
          { label: "Xiaomi / Redmi", href: "/shop?brand=Xiaomi" },
          { label: "Realme Smartphone", href: "/shop?brand=Realme" },
          { label: "OnePlus", href: "/shop?brand=OnePlus" },
        ],
      },
      {
        title: "Phone Accessories",
        items: [
          { label: "Stylus Pen", href: "/shop?category=stylus" },
          { label: "Tablet Stand & Holder", href: "/shop?category=stand" },
          { label: "Fast Charger & GaN Adapter", href: "/shop?category=charger" },
          { label: "Type-C & Lightning Cables", href: "/shop?category=cable" },
          { label: "Screen Protector & Cases", href: "/shop?category=cases" },
        ],
      },
    ],
  },
  Monitor: {
    columns: [
      {
        title: "By Brand",
        items: [
          { label: "All Monitors", href: "/category/monitors" },
          { label: "ASUS Monitor", href: "/shop?brand=ASUS", hasSub: true },
          { label: "MSI Monitor", href: "/shop?brand=MSI", hasSub: true },
          { label: "Dell Monitor", href: "/shop?brand=Dell", hasSub: true },
          { label: "LG Monitor", href: "/shop?brand=LG", hasSub: true },
          { label: "Samsung Monitor", href: "/shop?brand=Samsung", hasSub: true },
          { label: "Gigabyte Monitor", href: "/shop?brand=Gigabyte" },
          { label: "Acer Monitor", href: "/shop?brand=Acer" },
          { label: "ViewSonic Monitor", href: "/shop?brand=ViewSonic" },
        ],
      },
      {
        title: "By Refresh Rate & Display",
        items: [
          { label: "144Hz - 180Hz Gaming", href: "/category/monitors?refresh=144" },
          { label: "240Hz - 360Hz Esports", href: "/category/monitors?refresh=240" },
          { label: "Curved Gaming Monitor", href: "/category/monitors?type=curved", hasSub: true },
          { label: "OLED / Mini-LED Displays", href: "/category/monitors?type=oled" },
          { label: "4K UHD Monitors", href: "/category/monitors?res=4k" },
          { label: "Ultrawide 21:9 Displays", href: "/category/monitors?type=ultrawide" },
        ],
      },
      {
        title: "Monitor Accessories",
        items: [
          { label: "Monitor Arm & Desk Mount", href: "/shop?category=mount" },
          { label: "DisplayPort 1.4 / 2.1 Cable", href: "/shop?category=dp" },
          { label: "HDMI 2.1 Ultra High Speed Cable", href: "/shop?category=hdmi" },
          { label: "Screen Cleaner Kit", href: "/shop?category=cleaner" },
        ],
      },
    ],
  },
  Networking: {
    columns: [
      {
        title: "Routers",
        items: [
          { label: "Wi-Fi 6 Routers", href: "/shop?category=wifi6", hasSub: true },
          { label: "Wi-Fi 7 Next-Gen Routers", href: "/shop?category=wifi7" },
          { label: "Mesh Wi-Fi System", href: "/shop?category=mesh", hasSub: true },
          { label: "Gaming Router", href: "/shop?category=gaming-router" },
          { label: "4G / 5G Pocket Router", href: "/shop?category=mifi" },
        ],
      },
      {
        title: "Switches & AP",
        items: [
          { label: "Network Switch (Gigabit/PoE)", href: "/shop?category=switch" },
          { label: "Access Point (Ceiling/Outdoor)", href: "/shop?category=ap" },
          { label: "Range Extender / Repeater", href: "/shop?category=extender" },
          { label: "PCIe / USB Wi-Fi Adapter", href: "/shop?category=wifi-card" },
        ],
      },
      {
        title: "Cables & Server Racks",
        items: [
          { label: "Cat6 / Cat7 LAN Cable", href: "/shop?category=lan" },
          { label: "Patch Cord & Connectors", href: "/shop?category=patch" },
          { label: "Crimping Tool & Network Tester", href: "/shop?category=tools" },
          { label: "Server Rack / Wall Mount Cabinet", href: "/shop?category=rack" },
        ],
      },
    ],
  },
  "Office Equipments": {
    columns: [
      {
        title: "Printers",
        items: [
          { label: "Laser Printer", href: "/shop?category=laser-printer", hasSub: true },
          { label: "Ink Tank / Inkjet Printer", href: "/shop?category=ink-printer", hasSub: true },
          { label: "All-in-One Multifunction Printer", href: "/shop?category=aio-printer" },
          { label: "POS & Barcode Printer", href: "/shop?category=pos" },
        ],
      },
      {
        title: "Projectors & Scanners",
        items: [
          { label: "Multimedia Projector", href: "/shop?category=projector", hasSub: true },
          { label: "Document Scanner", href: "/shop?category=scanner" },
          { label: "Interactive Touch Board", href: "/shop?category=interactive" },
          { label: "Conference Mic & Speaker", href: "/shop?category=conference" },
        ],
      },
      {
        title: "Office Supplies",
        items: [
          { label: "Toner Cartridge", href: "/shop?category=toner" },
          { label: "Printer Ink Bottle", href: "/shop?category=ink" },
          { label: "Paper Shredder Machine", href: "/shop?category=shredder" },
          { label: "Laminating Machine", href: "/shop?category=laminator" },
          { label: "Motorized Projector Screen", href: "/shop?category=screen" },
        ],
      },
    ],
  },
  Gadgets: {
    columns: [
      {
        title: "Wearables",
        items: [
          { label: "Smart Watches", href: "/shop?category=smartwatch", hasSub: true },
          { label: "Fitness Smart Bands", href: "/shop?category=smartband" },
          { label: "TWS Wireless Earbuds", href: "/shop?category=tws", hasSub: true },
          { label: "Smart Audio Glasses", href: "/shop?category=glasses" },
        ],
      },
      {
        title: "Lifestyle & Smart Tech",
        items: [
          { label: "Action Camera & Gimbals", href: "/shop?category=actioncam" },
          { label: "Camera Drone & Accessories", href: "/shop?category=drone" },
          { label: "Bluetooth Portable Speaker", href: "/shop?category=speaker" },
          { label: "Electric Shaver & Trimmer", href: "/shop?category=shaver" },
        ],
      },
      {
        title: "Smart Home",
        items: [
          { label: "Smart Light & RGB Bulb", href: "/shop?category=smartlight" },
          { label: "Car Fast Charger & Mount", href: "/shop?category=carmount" },
          { label: "Electric Sonic Toothbrush", href: "/shop?category=toothbrush" },
          { label: "Smart Electric Kettle", href: "/shop?category=kettle" },
        ],
      },
    ],
  },
  Cameras: {
    columns: [
      {
        title: "Camera Bodies",
        items: [
          { label: "Mirrorless Camera", href: "/shop?category=mirrorless", hasSub: true },
          { label: "DSLR Camera", href: "/shop?category=dslr" },
          { label: "Action Camera (GoPro / DJI)", href: "/shop?category=actioncam", hasSub: true },
          { label: "Instant Polaroid Camera", href: "/shop?category=instantcam" },
        ],
      },
      {
        title: "Lenses & Optics",
        items: [
          { label: "Prime Lens (35mm/50mm/85mm)", href: "/shop?category=primelens" },
          { label: "Zoom & Telephoto Lens", href: "/shop?category=zoomlens" },
          { label: "UV & CPL Lens Filters", href: "/shop?category=filters" },
        ],
      },
      {
        title: "Studio Gear",
        items: [
          { label: "Camera Tripod & Monopod", href: "/shop?category=tripod" },
          { label: "Handheld Gimbal Stabilizer", href: "/shop?category=gimbal" },
          { label: "Camera Backpack & Bags", href: "/shop?category=camerabag" },
          { label: "Studio Speedlite Flash", href: "/shop?category=flash" },
        ],
      },
    ],
  },
  "TV & Sound": {
    columns: [
      {
        title: "Television",
        items: [
          { label: "Smart Android TV", href: "/shop?category=tv", hasSub: true },
          { label: "4K Google TV", href: "/shop?category=4ktv", hasSub: true },
          { label: "OLED / QLED TV", href: "/shop?category=oledtv" },
          { label: "TV Wall Mount & Bracket", href: "/shop?category=tvmount" },
        ],
      },
      {
        title: "Audio Systems",
        items: [
          { label: "Home Theater Soundbar", href: "/shop?category=soundbar", hasSub: true },
          { label: "2.1 Multimedia Speaker", href: "/shop?category=speaker" },
          { label: "5.1 Surround Sound System", href: "/shop?category=surround" },
          { label: "Party Speaker with Mic", href: "/shop?category=partyspeaker" },
        ],
      },
      {
        title: "Media Accessories",
        items: [
          { label: "TV Streaming Box / Stick", href: "/shop?category=tvbox" },
          { label: "Optical Toslink Cable", href: "/shop?category=optical" },
          { label: "HDMI 8K / 4K Cable", href: "/shop?category=hdmi" },
        ],
      },
    ],
  },
  Power: {
    columns: [
      {
        title: "UPS Systems",
        items: [
          { label: "Offline UPS (650VA - 2000VA)", href: "/shop?category=offline-ups", hasSub: true },
          { label: "Online UPS (1KVA - 10KVA)", href: "/shop?category=online-ups", hasSub: true },
          { label: "Mini DC UPS for Wi-Fi Router", href: "/shop?category=mini-ups" },
        ],
      },
      {
        title: "Voltage & Power Protection",
        items: [
          { label: "Automatic Voltage Stabilizer", href: "/shop?category=stabilizer" },
          { label: "Home IPS & Inverter", href: "/shop?category=ips" },
          { label: "Surge Protector & Spike Strip", href: "/shop?category=surge" },
        ],
      },
      {
        title: "Batteries & Backup",
        items: [
          { label: "UPS Lead Acid Battery", href: "/shop?category=battery" },
          { label: "Portable Lithium Power Station", href: "/shop?category=powerstation" },
        ],
      },
    ],
  },
  Security: {
    columns: [
      {
        title: "CCTV Cameras",
        items: [
          { label: "IP Surveillance Camera", href: "/shop?category=ip-camera", hasSub: true },
          { label: "HD Analog Camera", href: "/shop?category=analog-camera" },
          { label: "Wi-Fi Smart Security Camera", href: "/shop?category=wifi-camera", hasSub: true },
          { label: "PTZ Speed Dome Camera", href: "/shop?category=ptz" },
        ],
      },
      {
        title: "Recording Systems",
        items: [
          { label: "NVR (Network Video Recorder)", href: "/shop?category=nvr" },
          { label: "DVR (Digital Video Recorder)", href: "/shop?category=dvr" },
          { label: "Surveillance Hard Disk (WD Purple)", href: "/shop?category=surveillance-hdd" },
        ],
      },
      {
        title: "Access Control",
        items: [
          { label: "Biometric Fingerprint Attendance", href: "/shop?category=biometric" },
          { label: "Smart Fingerprint Door Lock", href: "/shop?category=doorlock" },
          { label: "Walk-Through Metal Detector", href: "/shop?category=metal-detector" },
        ],
      },
    ],
  },
  Gaming: {
    columns: [
      {
        title: "Gaming Peripherals",
        items: [
          { label: "Gaming Mouse", href: "/shop?category=gaming-mouse", hasSub: true },
          { label: "Mechanical Gaming Keyboard", href: "/shop?category=mechanical-keyboard", hasSub: true },
          { label: "7.1 Surround Gaming Headset", href: "/shop?category=gaming-headset", hasSub: true },
          { label: "Extended RGB Mousepad", href: "/shop?category=gaming-mousepad" },
        ],
      },
      {
        title: "Gaming Furniture",
        items: [
          { label: "Ergonomic Racing Gaming Chair", href: "/shop?category=gaming-chair", hasSub: true },
          { label: "RGB Gaming Computer Desk", href: "/shop?category=gaming-desk" },
          { label: "RGB Headphone Stand", href: "/shop?category=headphone-stand" },
        ],
      },
      {
        title: "Consoles & Simulators",
        items: [
          { label: "Sony PlayStation 5 (PS5)", href: "/shop?category=ps5", hasSub: true },
          { label: "Microsoft Xbox Series X / S", href: "/shop?category=xbox" },
          { label: "Nintendo Switch OLED", href: "/shop?category=switch" },
          { label: "Racing Steering Wheel & Pedals", href: "/shop?category=racing-wheel" },
        ],
      },
    ],
  },
  Appliance: {
    columns: [
      {
        title: "Cooling & Climate",
        items: [
          { label: "Inverter Air Conditioner (AC)", href: "/shop?category=ac", hasSub: true },
          { label: "Air Cooler & Standing Fan", href: "/shop?category=fan" },
          { label: "HEPA Filter Air Purifier", href: "/shop?category=air-purifier" },
          { label: "Room Dehumidifier", href: "/shop?category=dehumidifier" },
        ],
      },
      {
        title: "Home Appliances",
        items: [
          { label: "Microwave & Convection Oven", href: "/shop?category=oven" },
          { label: "Electric Blender & Food Processor", href: "/shop?category=blender" },
          { label: "Robotic & Cordless Vacuum Cleaner", href: "/shop?category=vacuum" },
          { label: "Instant Water Heater & Geyser", href: "/shop?category=geyser" },
        ],
      },
    ],
  },
  Software: {
    columns: [
      {
        title: "Operating Systems & Office",
        items: [
          { label: "Microsoft Windows 11 Home / Pro", href: "/shop?category=windows", hasSub: true },
          { label: "Microsoft Office 365 / Home", href: "/shop?category=office", hasSub: true },
          { label: "Adobe Creative Cloud", href: "/shop?category=adobe" },
        ],
      },
      {
        title: "Antivirus & Internet Security",
        items: [
          { label: "Kaspersky Internet Security", href: "/shop?category=kaspersky", hasSub: true },
          { label: "ESET NOD32 Antivirus", href: "/shop?category=eset" },
          { label: "Quick Heal Total Security", href: "/shop?category=quickheal" },
          { label: "Bitdefender Total Security", href: "/shop?category=bitdefender" },
        ],
      },
    ],
  },
  Servers: {
    columns: [
      {
        title: "Server Hardware",
        items: [
          { label: "1U / 2U Rack Servers", href: "/shop?category=rack-server", hasSub: true },
          { label: "Tower Enterprise Server", href: "/shop?category=tower-server", hasSub: true },
          { label: "Server Motherboard (Dual Socket)", href: "/shop?category=server-board" },
          { label: "Intel Xeon / AMD EPYC Processors", href: "/shop?category=server-cpu" },
        ],
      },
      {
        title: "Server Components",
        items: [
          { label: "DDR4 / DDR5 ECC Registered RAM", href: "/shop?category=ecc-ram" },
          { label: "Enterprise SAS / SATA Hard Drives", href: "/shop?category=enterprise-hdd" },
          { label: "RAID Controller Cards", href: "/shop?category=raid" },
          { label: "Redundant Server Power Supply", href: "/shop?category=server-psu" },
        ],
      },
    ],
  },
};

// Sub-flyout preview for items with arrows in Accessories
export const SUB_FLYOUT_ITEMS = {
  "Headphone & Headsets": [
    { label: "Gaming Headset (RGB / 7.1)", href: "/shop?type=gaming-headset" },
    { label: "Wireless Bluetooth Headphones", href: "/shop?type=wireless-headphone" },
    { label: "Wired Studio Headphones", href: "/shop?type=studio-headphone" },
    { label: "In-Ear Earphones & IEMs", href: "/shop?type=iem" },
    { label: "Headphone Stand & Hanger", href: "/shop?type=stand" },
    { label: "Audio Splitter & Extension Cable", href: "/shop?type=audio-splitter" },
  ],
  Mouse: [
    { label: "Wireless Mouse (2.4G / Bluetooth)", href: "/shop?type=wireless-mouse" },
    { label: "Wired Gaming Mouse", href: "/shop?type=gaming-mouse" },
    { label: "Ergonomic Vertical Mouse", href: "/shop?type=ergonomic-mouse" },
    { label: "RGB Honeycomb Lightweight Mouse", href: "/shop?type=lightweight-mouse" },
  ],
  Keyboard: [
    { label: "Mechanical Gaming Keyboard", href: "/shop?type=mechanical-keyboard" },
    { label: "Wireless / Bluetooth Keyboard", href: "/shop?type=wireless-keyboard" },
    { label: "Membrane Office Keyboard", href: "/shop?type=membrane-keyboard" },
    { label: "Custom Keycaps & Switches", href: "/shop?type=keycaps" },
  ],
  WebCam: [
    { label: "1080p Full HD WebCam", href: "/shop?type=1080p-webcam" },
    { label: "4K Ultra HD WebCam", href: "/shop?type=4k-webcam" },
    { label: "Conference WebCam with Speaker", href: "/shop?type=conf-webcam" },
  ],
  Microphone: [
    { label: "USB Condenser Microphone", href: "/shop?type=usb-mic" },
    { label: "XLR Studio Recording Mic", href: "/shop?type=xlr-mic" },
    { label: "Wireless Lapel / Collar Mic", href: "/shop?type=lapel-mic" },
    { label: "Boom Arm & Shock Mount", href: "/shop?type=boom-arm" },
  ],
  "Power Bank": [
    { label: "10000mAh Compact Power Bank", href: "/shop?cap=10000" },
    { label: "20000mAh High Capacity Power Bank", href: "/shop?cap=20000" },
    { label: "65W / 100W Laptop Power Bank", href: "/shop?cap=laptop-powerbank" },
    { label: "Magnetic Wireless Power Bank", href: "/shop?type=magsafe" },
  ],
  Cable: [
    { label: "HDMI 2.0 / 2.1 4K 8K Cable", href: "/shop?cable=hdmi" },
    { label: "DisplayPort 1.4 / 2.0 Cable", href: "/shop?cable=dp" },
    { label: "Type-C Fast Charging Cable", href: "/shop?cable=typec" },
    { label: "Cat6 RJ45 LAN Patch Cable", href: "/shop?cable=lan" },
  ],
  Converter: [
    { label: "Type-C to HDMI Converter", href: "/shop?converter=typec-hdmi" },
    { label: "VGA to HDMI Adapter", href: "/shop?converter=vga-hdmi" },
    { label: "USB to RJ45 Gigabit Ethernet", href: "/shop?converter=usb-lan" },
    { label: "DisplayPort to HDMI Cable", href: "/shop?converter=dp-hdmi" },
  ],
};
