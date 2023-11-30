import React, {useRef, useEffect, useState} from 'react';
import jsQR from 'jsqr';

export interface QRScannerProps {
    width?: number;
    height?: number;
    onScan: (data: string) => void;
}

/**
 * 二维码扫描组件
 * @param width    画布宽度
 * @param height    画布高度
 * @param onScan    扫描成功的回调函数
 * @constructor QRScanner
 */
const QRScanner: React.FC<QRScannerProps> = ({width = 300, height = 300, onScan}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isScanning, setIsScanning] = useState(true);
    const [scanSuccess, setScanSuccess] = useState(false); // 新的状态变量
    let streamRef: MediaStream | null = null; // 存储摄像头流的引用

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({video: {facingMode: "environment"}})
            .then(stream => {
                streamRef = stream; // 存储对摄像头流的引用
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.addEventListener('loadedmetadata', () => {
                        videoRef.current?.play().then(() => {
                            requestAnimationFrame(tick);
                        }).catch(err => console.error("Error playing video: ", err));
                    });
                }
            }).catch(err => {
            console.error("Error accessing media devices: ", err);
            setIsScanning(false);
        });
    }, []);
    const tick = () => {
        // 如果已经成功扫描，就不再继续执行tick
        if (!isScanning) return;

        if (videoRef.current && canvasRef.current) {
            if (videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
                let video = videoRef.current;
                let canvas = canvasRef.current;
                let ctx = canvas.getContext('2d');

                if (ctx) {
                    canvas.height = height;
                    canvas.width = width;
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

                    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    let code = jsQR(imageData.data, imageData.width, imageData.height);

                    if (code) {
                        onScan(code.data); // 扫码成功
                        setIsScanning(false); // 更新状态为不再扫描
                        setScanSuccess(true); // 显示扫描成功的蒙层
                        if (streamRef) {
                            let tracks = streamRef.getTracks();
                            tracks.forEach(track => track.stop()); // 关闭摄像头
                        }
                        return; // 直接返回，避免再次调用 requestAnimationFrame
                    }
                }
            }
            requestAnimationFrame(tick);
        }
    };
    return (
        <div>
            <video ref={videoRef} style={{display: 'none'}}></video>
            <canvas ref={canvasRef}
                    style={{
                        display: isScanning ? 'block' : 'none',
                        width: `${width}px`,
                        height: `${height}px`
                    }}></canvas>
            {scanSuccess && <div className="scan-success-overlay">识别成功！</div>} {/* 显示识别成功的蒙层 */}
        </div>
    );
}

export default QRScanner;
