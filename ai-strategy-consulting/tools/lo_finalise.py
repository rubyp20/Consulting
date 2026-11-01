"""Open docx in LibreOffice via UNO, update all indexes (TOC) and fields, save docx and export PDF."""
import sys, os, subprocess, time, uno
from com.sun.star.beans import PropertyValue
src = os.path.abspath(sys.argv[1]); out_docx = os.path.abspath(sys.argv[2]); out_pdf = os.path.abspath(sys.argv[3])
port = 2002
proc = subprocess.Popen(['soffice','--headless','--invisible','--nologo','--norestore',f'--accept=socket,host=127.0.0.1,port={port};urp;'], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
local = uno.getComponentContext(); resolver = local.ServiceManager.createInstanceWithContext('com.sun.star.bridge.UnoUrlResolver', local)
ctx = None
for i in range(60):
    try:
        ctx = resolver.resolve(f'uno:socket,host=127.0.0.1,port={port};urp;StarOffice.ComponentContext'); break
    except Exception: time.sleep(1)
if ctx is None: raise SystemExit('could not connect to soffice')
desktop = ctx.ServiceManager.createInstanceWithContext('com.sun.star.frame.Desktop', ctx)
def pv(n,v):
    p=PropertyValue(); p.Name=n; p.Value=v; return p
doc = desktop.loadComponentFromURL(uno.systemPathToFileUrl(src), '_blank', 0, (pv('Hidden',True),))
idx = doc.getDocumentIndexes()
for i in range(idx.getCount()):
    idx.getByIndex(i).update()
doc.getTextFields().refresh()
# refresh twice: page numbers settle after TOC length changes
for i in range(idx.getCount()):
    idx.getByIndex(i).update()
doc.storeToURL(uno.systemPathToFileUrl(out_docx), (pv('FilterName','MS Word 2007 XML'),))
doc.storeToURL(uno.systemPathToFileUrl(out_pdf), (pv('FilterName','writer_pdf_Export'),))
doc.close(True)
try: desktop.terminate()
except Exception: pass
proc.wait(timeout=30)
print('finalised', out_docx, out_pdf)
