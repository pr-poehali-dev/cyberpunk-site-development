import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface Course {
  id: number;
  title: string;
  description: string;
  duration: string;
  level: string;
  price: string;
  category: string;
}

interface Schedule {
  id: number;
  course: string;
  date: string;
  time: string;
  instructor: string;
}

interface Review {
  id: number;
  name: string;
  course: string;
  rating: number;
  comment: string;
}

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  const courses: Course[] = [
    {
      id: 1,
      title: 'Cyber Security Fundamentals',
      description: 'Освойте основы кибербезопасности и защиты данных',
      duration: '12 недель',
      level: 'Начальный',
      price: '45,000 ₽',
      category: 'Security'
    },
    {
      id: 2,
      title: 'AI & Machine Learning',
      description: 'Погрузитесь в мир искусственного интеллекта',
      duration: '16 недель',
      level: 'Продвинутый',
      price: '65,000 ₽',
      category: 'AI'
    },
    {
      id: 3,
      title: 'Blockchain Development',
      description: 'Создавайте децентрализованные приложения',
      duration: '10 недель',
      level: 'Средний',
      price: '55,000 ₽',
      category: 'Blockchain'
    },
    {
      id: 4,
      title: 'Quantum Computing',
      description: 'Будущее вычислений уже здесь',
      duration: '14 недель',
      level: 'Продвинутый',
      price: '75,000 ₽',
      category: 'Quantum'
    }
  ];

  const schedule: Schedule[] = [
    { id: 1, course: 'Cyber Security Fundamentals', date: '15.10.2025', time: '18:00 - 21:00', instructor: 'Алексей Петров' },
    { id: 2, course: 'AI & Machine Learning', date: '16.10.2025', time: '19:00 - 22:00', instructor: 'Мария Иванова' },
    { id: 3, course: 'Blockchain Development', date: '17.10.2025', time: '18:30 - 21:30', instructor: 'Дмитрий Сидоров' },
    { id: 4, course: 'Quantum Computing', date: '18.10.2025', time: '20:00 - 23:00', instructor: 'Елена Смирнова' }
  ];

  const reviews: Review[] = [
    {
      id: 1,
      name: 'Иван Соколов',
      course: 'Cyber Security',
      rating: 5,
      comment: 'Невероятный курс! Получил все необходимые знания для старта карьеры в киберзащите.'
    },
    {
      id: 2,
      name: 'Анна Волкова',
      course: 'AI & ML',
      rating: 5,
      comment: 'Преподаватели - настоящие профессионалы. Материал подается очень доступно.'
    },
    {
      id: 3,
      name: 'Сергей Новиков',
      course: 'Blockchain',
      rating: 4,
      comment: 'Отличная программа, много практики. Уже создал свой первый смарт-контракт!'
    }
  ];

  const handleEnroll = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCourse) return;
    
    try {
      const response = await fetch('https://functions.poehali.dev/ef8b80e8-ff15-406d-a7c5-5b61504e9e44', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          course_id: selectedCourse.id,
          course_title: selectedCourse.title,
          name: formData.name,
          email: formData.email,
          phone: formData.phone
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        alert(`${data.message}\nВаш ID регистрации: ${data.enrollment_id}`);
        setFormData({ name: '', email: '', phone: '' });
      } else {
        alert(`Ошибка: ${data.error}`);
      }
    } catch (error) {
      alert('Ошибка подключения к серверу');
      console.error('Enrollment error:', error);
    }
  };

  const navItems = [
    { id: 'home', label: 'Главная', icon: 'Home' },
    { id: 'courses', label: 'Курсы', icon: 'GraduationCap' },
    { id: 'schedule', label: 'Расписание', icon: 'Calendar' },
    { id: 'reviews', label: 'Отзывы', icon: 'Star' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-primary/30 bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <h1 className="text-2xl md:text-3xl font-black neon-glow text-primary">
              CYBER EDUCATION
            </h1>
            <div className="hidden md:flex gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center gap-2 font-medium transition-all ${
                    activeSection === item.id
                      ? 'text-primary neon-glow'
                      : 'text-muted-foreground hover:text-primary'
                  }`}
                >
                  <Icon name={item.icon as any} size={20} />
                  {item.label}
                </button>
              ))}
            </div>
            <Button className="bg-primary text-primary-foreground neon-border hover:bg-primary/80 font-semibold">
              <Icon name="User" size={18} className="mr-2" />
              Войти
            </Button>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        {activeSection === 'home' && (
          <section className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 animate-glow-pulse"></div>
            <div className="container mx-auto px-4 py-32 relative">
              <div className="max-w-4xl mx-auto text-center animate-fade-in">
                <h2 className="text-5xl md:text-7xl font-black mb-6 neon-glow text-primary leading-tight">
                  БУДУЩЕЕ НАЧИНАЕТСЯ ЗДЕСЬ
                </h2>
                <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-light">
                  Образовательная платформа нового поколения для тех, кто создает завтрашний день
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-primary text-primary-foreground neon-border hover:bg-primary/80 text-lg font-bold px-8 py-6"
                    onClick={() => setActiveSection('courses')}
                  >
                    <Icon name="Rocket" size={24} className="mr-2" />
                    Начать обучение
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-2 border-secondary text-secondary neon-border hover:bg-secondary/10 text-lg font-bold px-8 py-6"
                    onClick={() => setActiveSection('schedule')}
                  >
                    <Icon name="Calendar" size={24} className="mr-2" />
                    Расписание
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-6xl mx-auto">
                {[
                  { icon: 'Brain', title: 'AI-Powered', desc: 'Персональные траектории обучения' },
                  { icon: 'Zap', title: 'Real-Time', desc: 'Живые трансляции и практика' },
                  { icon: 'Shield', title: 'Certified', desc: 'Международные сертификаты' }
                ].map((item, idx) => (
                  <Card key={idx} className="cyber-card animate-slide-up border-primary/50 hover:border-primary transition-all" style={{ animationDelay: `${idx * 0.1}s` }}>
                    <CardHeader>
                      <Icon name={item.icon as any} size={48} className="text-primary mb-4 animate-glow-pulse" />
                      <CardTitle className="text-xl text-primary">{item.title}</CardTitle>
                      <CardDescription className="text-muted-foreground">{item.desc}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeSection === 'courses' && (
          <section className="container mx-auto px-4 py-16">
            <h2 className="text-4xl md:text-5xl font-black mb-12 text-center neon-glow text-primary">
              НАШИ КУРСЫ
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {courses.map((course, idx) => (
                <Card key={course.id} className="cyber-card border-primary/50 hover:border-primary transition-all animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge className="bg-secondary text-secondary-foreground">{course.category}</Badge>
                      <Badge variant="outline" className="border-primary text-primary">{course.level}</Badge>
                    </div>
                    <CardTitle className="text-2xl text-primary mb-2">{course.title}</CardTitle>
                    <CardDescription className="text-muted-foreground">{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2 text-sm">
                        <Icon name="Clock" size={18} className="text-primary" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Icon name="DollarSign" size={18} className="text-primary" />
                        <span className="text-xl font-bold text-primary">{course.price}</span>
                      </div>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          className="w-full bg-primary text-primary-foreground neon-border hover:bg-primary/80 font-bold"
                          onClick={() => setSelectedCourse(course)}
                        >
                          <Icon name="Zap" size={18} className="mr-2" />
                          Записаться на курс
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-card border-primary/50">
                        <DialogHeader>
                          <DialogTitle className="text-2xl text-primary">Регистрация на курс</DialogTitle>
                          <DialogDescription className="text-muted-foreground">
                            {course.title}
                          </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleEnroll} className="space-y-4">
                          <div>
                            <Label htmlFor="name" className="text-foreground">Имя</Label>
                            <Input
                              id="name"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              placeholder="Иван Иванов"
                              required
                              className="bg-input border-primary/30 focus:border-primary"
                            />
                          </div>
                          <div>
                            <Label htmlFor="email" className="text-foreground">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              placeholder="ivan@example.com"
                              required
                              className="bg-input border-primary/30 focus:border-primary"
                            />
                          </div>
                          <div>
                            <Label htmlFor="phone" className="text-foreground">Телефон</Label>
                            <Input
                              id="phone"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              placeholder="+7 (999) 123-45-67"
                              required
                              className="bg-input border-primary/30 focus:border-primary"
                            />
                          </div>
                          <Button type="submit" className="w-full bg-primary text-primary-foreground neon-border hover:bg-primary/80 font-bold">
                            Отправить заявку
                          </Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {activeSection === 'schedule' && (
          <section className="container mx-auto px-4 py-16">
            <h2 className="text-4xl md:text-5xl font-black mb-12 text-center neon-glow text-primary">
              РАСПИСАНИЕ
            </h2>
            <div className="max-w-4xl mx-auto space-y-4">
              {schedule.map((item, idx) => (
                <Card key={item.id} className="cyber-card border-primary/50 hover:border-primary transition-all animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Курс</p>
                        <p className="font-bold text-primary">{item.course}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Дата</p>
                        <p className="font-semibold flex items-center gap-2">
                          <Icon name="Calendar" size={16} className="text-primary" />
                          {item.date}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Время</p>
                        <p className="font-semibold flex items-center gap-2">
                          <Icon name="Clock" size={16} className="text-primary" />
                          {item.time}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Преподаватель</p>
                        <p className="font-semibold flex items-center gap-2">
                          <Icon name="User" size={16} className="text-primary" />
                          {item.instructor}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {activeSection === 'reviews' && (
          <section className="container mx-auto px-4 py-16">
            <h2 className="text-4xl md:text-5xl font-black mb-12 text-center neon-glow text-primary">
              ОТЗЫВЫ
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {reviews.map((review, idx) => (
                <Card key={review.id} className="cyber-card border-primary/50 hover:border-primary transition-all animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <Icon name="User" size={24} className="text-primary-foreground" />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-primary">{review.name}</CardTitle>
                        <CardDescription className="text-sm text-muted-foreground">{review.course}</CardDescription>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={18}
                          className={i < review.rating ? 'text-secondary fill-secondary' : 'text-muted-foreground'}
                        />
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground italic">"{review.comment}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="border-t border-primary/30 mt-24 bg-card">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-black text-primary mb-4 neon-glow">CYBER EDUCATION</h3>
              <p className="text-muted-foreground">Образование будущего доступно сегодня</p>
            </div>
            <div>
              <h4 className="font-bold text-primary mb-3">Контакты</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <Icon name="Mail" size={16} className="text-primary" />
                  info@cyberedu.ru
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="Phone" size={16} className="text-primary" />
                  +7 (800) 555-35-35
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-primary mb-3">Соцсети</h4>
              <div className="flex gap-4">
                {['Twitter', 'Github', 'Linkedin'].map((social) => (
                  <button key={social} className="w-10 h-10 rounded-full border border-primary/50 hover:border-primary flex items-center justify-center transition-all neon-border">
                    <Icon name={social as any} size={18} className="text-primary" />
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-primary/30 mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 Cyber Education. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}